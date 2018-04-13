"use strict";

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.BATHROOM_STATUS_TABLE;

module.exports.updateBathroomStatus = (event, context, callback) => {
  const { queryStringParameters } = event;
  const { status, bathroomId } = queryStringParameters;
  let response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
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
      const east = result.Items[1];
      response.body = `${west.bathroomId} is ${west.status} ${
        west.status === "open" ? ":gottarun:" : ":no_entry_sign:"
      } \n ${east.bathroomId} is ${east.status} ${
        east.status === "open" ? ":gottarun:" : ":no_entry_sign:"
      }`;
      callback(null, response);
    }
  });
};
