![iot](https://user-images.githubusercontent.com/24446573/38755889-12d8e5ce-3f2d-11e8-80d1-e7564c9e5053.gif)

![20180413_083840](https://user-images.githubusercontent.com/24446573/38755601-fd019706-3f2b-11e8-813a-4ffb2463ef21.jpg)

![screen shot 2018-04-13 at 2 55 46 pm](https://user-images.githubusercontent.com/24446573/38755385-271444ae-3f2b-11e8-8d76-25fbc3df13a7.png)

# Project desciption

My office has two (single-person) bathrooms and more than two employees. At a meeting it was mentioned that it'd be nice to have some sort of way of knowing the occupancy of the bathroom _before_ making the long walk down the hallway or, worse, making the trip to the other side of the office.

I recognized this as an opportunity for some microcontroller action (and some AWS action). I thought it'd be nice to integrate a slash command in our slack channel `/bathroom` and receive the current status of our east/west bathrooms. Because the data lives in DynamoDB, it will be effortless to build other apps to show bathroom status.

_I will write complete instructions for the lambda functions and arduino project and update this repo._

Also of note, the entire project is oriented around the lambda functions which the arduino will hit to update the bathroom status (when the reed switch is closed) and the lambda functions that handle the slash POST request coming from Slack.

### Things you'll need:

* [The esp8266 microcontroller](https://www.amazon.com/HiLetgo-Internet-Development-Wireless-Micropython/dp/B010O1G1ES)—which was < $10 at time of writing
  * Read about the esp8266 [https://en.wikipedia.org/wiki/ESP8266](on wikipedia to understand what it is).
* [The Arduino IDE](https://www.arduino.cc/en/Main/Software)—free
* [A reed switch](https://www.adafruit.com/product/375)— < $5 at time of writing. Read about [reed switches because they're baller](https://en.wikipedia.org/wiki/Reed_switch)
* Some [jumper wires](https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=jumper+wires). These are not necessary, but help if your esp8266 is a stretch from the wall outlet powering it.
* An old [microusb charger](https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=microusb+phone+charger)—this will serve as our power supply
* This article <3

Bookmark this page, get your stuff, and come back when you're ready!
