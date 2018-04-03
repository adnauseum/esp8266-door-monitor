"use strict";

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.YOUR_DYNAMODB_TABLE_NAME;

// NOTE: I set up no error handling here. That's what happens when you make things on your lunch break

module.exports.updateBathroomStatus = (event, context, callback) => {
  const { queryStringParameters } = event;
  const { status, bathroomId } = queryStringParameters;
  let response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*" // needed for CORS business
    }
  };
  const params = {
    TableName,
    Item: {
      bathroomId,
      status
    }
  };
  dynamoDB.put(params, (err, result) => {
    response.body = JSON.stringify({
      err,
      result,
      status,
      bathroomId
    });
    callback(null, response);
  });
};

module.exports.readBathroomStatus = (event, context, callback) => {
  let response = {
    statusCode: 200
  };
  const params = {
    TableName
  };
  // scanning the DB with this small data set is no performance issue
  dynamoDB.scan(params, (err, result) => {
    if (err) {
      response.body = JSON.stringify({ err });
      callback(null, response);
    }
    // If request is from slack;
    if (event.headers["User-Agent"].includes("Slackbot")) {
      // custom response for Slack integration
      const west = result.Items[0];
      response.body = `${west.bathroomId} is ${west.status} ${
        west.status === "open" ? ":gottarun:" : ":no_entry_sign:"
      }`;
      // include all your doors in this above logic
      callback(null, response);
    }
  });
};
