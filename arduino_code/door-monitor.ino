
/*
 *  HTTP over TLS (HTTPS) example sketch
 *
 *  This example demonstrates how to use
 *  WiFiClientSecure class to access HTTPS API.
 *  We fetch and display the status of
 *  esp8266/Arduino project continuous integration
 *  build.
 *
 *  Limitations:
 *    only RSA certificates
 *    no support of Perfect Forward Secrecy (PFS)
 *    TLSv1.2 is supported since version 2.4.0-rc1
 *
 *  Created by Ivan Grokhotkov, 2015.
 *  This example is in public domain.
 */

#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>

const char *ssid = "YOUR_WIFI_NAME";
const char *password = "YOUR_WIFI_PASSWORD";

const char *host = "j3gdcj7yv2.execute-api.us-east-1.amazonaws.com";
const int httpsPort = 443;

// Use web browser to view and copy
// SHA1 fingerprint of the certificate

const char *fingerprint = "00 01 02 03 04... YOUR LAMBDA FUNCTION SHA-1 FINGERPRINT";
int reedSwitch = 2;
int doorState = 1; // initialize open
WiFiClientSecure client;

void setup()
{
    pinMode(reedSwitch, INPUT);
    pinMode(LED_BUILTIN, OUTPUT);
    Serial.begin(115200);
    delay(10);
    Serial.println();
}

void updateBathroomStatus(String queryParams)
{
    // Use WiFiClientSecure class to create TLS connection

    if (!client.connect(host, httpsPort))
    {
        Serial.println("connection failed");
        return;
    }

    if (client.verify(fingerprint, host))
    {
        //    Serial.println("certificate matches");
    }
    else
    {
        Serial.println("certificate doesn't match");
    }

    String url = "/dev/bathroom-status/update/" + queryParams;

    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "User-Agent: ESP8266\r\n" +
                 "Connection: close\r\n\r\n");
}

void loop()
{

    int currentState = digitalRead(reedSwitch); // state is `0` if closed and `1` if opened
    if (currentState != doorState)
    {
        // change internal door state
        doorState = currentState;

        if (currentState == 0)
        {
            digitalWrite(LED_BUILTIN, HIGH);
            // the bathroom is in use
            updateBathroomStatus("?status=closed&bathroomId=west");
        }
        else if (currentState == 1)
        {
            // the bathroom is open
            updateBathroomStatus("?status=open&bathroomId=west");
        }
    }
    else
    {
        // make sure the lights are turned on only when door is closed
        if (currentState == 0)
        {
            digitalWrite(LED_BUILTIN, LOW);
        }
        else
        {
            digitalWrite(LED_BUILTIN, HIGH);
        }
    }
}