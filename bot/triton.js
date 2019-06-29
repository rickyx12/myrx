'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  fetch = require('node-fetch'),
  fs = require('fs'),
  https = require('https'),
  // dataUrl = "https://mindanaodailymirror.ph/index.php",
  accessToken = "EAANQpoN0ZASsBAGpZCEx7dKNZBRhSsjIenZAyY1JzvDZAPFwYCwJ9LPUoKhVBF3mD3ZAcVYMgvrrIRgK94fHqZB7Aza7ePabp67ohsnFWUq8RJo6nk3dxj4IZBhGiZAjLnkUVkkYmDcEmGKdbXaf6IyT1WumabmYFsfJpJZAxjDFtB1ye0ZC6UG0lS8",
  app = express().use(bodyParser.json()); // creates express http server


  https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/myrxph.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/myrxph.space/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/myrxph.space/chain.pem'),
  }, app).listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Start node server
// app.listen( app.get( 'port' ), function() {
//   console.log( 'Node server is running on port ' + app.get( 'port' ));
//   });



// Creates the endpoint for our webhook 
app.post('/triton/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);


      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function.
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);        
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});


// Adds support for GET requests to our webhook
app.get('/triton/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "ricardo123"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});


// Handles messages events
function handleMessage(sender_psid, received_message) {

    if(received_message.text == 'register') {

      getFbId(sender_psid);
    }else {

      if(received_message.text) {

        sendTextOnly(sender_psid);
      }else if(received_message.attachments) {

        sendAttachments(sender_psid);
      }else {

        console.log('handle message fallback');
      }
    }  

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

  let response;

  let payload = received_postback.payload;

  if(payload == 'GET_STARTED_PAYLOAD') {
    
    sendGetStarted(sender_psid);
  
  }else{
    sendGetStarted(sender_psid);
  }

}


function sendGetStarted(recipientId) {

    let response;
 
    response = {
      "text": "Hello, Report a marine offender by sending a Video or Photo to me."
    }

     return callSendAPI(recipientId,response);
}


function sendTextOnly(recipientId) {

    let response;
 
    response = {
      "text": "Text Only",
      "quick_replies":[
        {
        "content_type":"text",
        "title":"Illegal Fishing",
        "payload":"ILLEGAL_FISHING",
        },
        {
        "content_type":"text",
        "title":"Endangered Species",
        "payload":"ENDANGERED_SPECIES",          
        },
        {
        "content_type":"text",
        "title":"Illegal Vessel",
        "payload":"ILLEGAL_VESSEL",          
        },
        {
        "content_type":"text",
        "title":"Marine Waste",
        "payload":"MARINE_WASTE",          
        }
      ]
    }

     return callSendAPI(recipientId,response);
}


function sendAttachments(recipientId) {

    let response;
 
    response = {
      "text": "With Attachments"
    }

     return callSendAPI(recipientId,response);
}

function getFbId(recipientId) {

  let response;

    response = {
      "text":recipientId
    }

  callSendAPI(recipientId,response);
}

function typing(sender_psid) {
  
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action":"typing_on"
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": accessToken },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 

}



function callSendAPI(sender_psid, response) {
  
  typing(sender_psid);

  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  const qs = 'access_token='+encodeURIComponent(accessToken);
  return fetch('https://graph.facebook.com/v2.6/me/messages?'+qs,{
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(request_body)
  });

}

