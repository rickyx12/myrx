'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  fetch = require('node-fetch'),
  // dataUrl = "https://mindanaodailymirror.ph/index.php",
  accessToken = "EAAR0oeXVZCIUBAIz6BrFVhAR19YZBM1pdCIL1zElT5cm0XRsgZCYI4J7pz4o31nKbM1ZBl0NTB5Fy9tQPZActJo51BjfLnDPy4lhQnIuIu2AZAQd1u5qbmXiIIM0gW359Bw3q9evvjedIM2PBJFTOuzla9YJMN6h5ZC8qVUoR3WBrJKak5ub7JW",
  app = express().use(bodyParser.json()); // creates express http server

// const admin = require('firebase-admin');

// var serviceAccount = require('./assets/pnr-api-d8a87f8bb318.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// var db = admin.firestore();


// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });



// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
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
      // pass the event to the appropriate handler function
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
app.get('/webhook', (req, res) => {

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


  if(received_message.quick_reply) {
    var payload = received_message.quick_reply.payload;

    if(payload == 'select_pediatrician') {

      getDoctors(sender_psid,'pediatrician');
    
    }else if(payload == 'select_ophthalmologist') {

      getDoctors(sender_psid,'ophthalmology');
    
    }else {

      console.log('no payload');
    }
  }else {

    if(received_message.text == 'register') {

      getFbId(sender_psid);
    }else {

      console.log('no payload');
    }
  }

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

  let response;

  let payload = received_postback.payload;

  if(payload == 'GET_STARTED_PAYLOAD') {
    
    sendGetStarted(sender_psid);
  
  }else if(payload == 'find_pharmacy'){

    showPharmacy(sender_psid);
  }else if(payload == 'find_doctor') {

    showDoctorsSpecialization(sender_psid);
  }else if(payload == 'find_laboratory') {

    showLaboratory(sender_psid);
  }else{

    console.log('No payload');
  }

}


function sendGetStarted(recipientId) {

    let response;
 
    response = {
      "attachment":{
      "type":"template",
      "payload":{
      "template_type":"generic",
      "elements":[
          {
            "title":"MyRx Medical Plaza",
            "image_url":"http://pick-n-ride.000webhostapp.com/doctors.jpg",
            "subtitle":"We can provide you the following services",
              "buttons":[
                {
                  "type":"postback",
                  "payload":"find_pharmacy",
                  "title":"Find Pharmacy"
                },
                {
                  "type":"postback",
                  "payload":"find_doctor",
                  "title":"Find Doctor"
                },
                {
                  "type":"postback",
                  "payload":"find_laboratory",
                  "title":"Find Laboratory"
                }
              ]           
          }
        ]
        }
      }
    }


     return callSendAPI(recipientId,response);
}



function showPharmacy(recipientId) {

    let response;
 
    response = {
      "attachment":{
      "type":"template",
      "payload":{
      "template_type":"generic",
      "elements":[
          {
            "title":"The Generics Pharmacy",
            "image_url":"http://pick-n-ride.000webhostapp.com/tgp.png",
            "subtitle":"17-A Kamuning Rd, Diliman, Quezon City, 1100 Metro Manila",
              "buttons":[
                {
                  "type":"postback",
                  "payload":"chat_tgp",
                  "title":"Chat"
                }
              ]           
          },
          {
            "title":"Rose Pharmacy",
            "image_url":"http://pick-n-ride.000webhostapp.com/rose.jpg",
            "subtitle":"Manahan, 1 Aurora Blvd Corner Anonas Street, Project 3, Quezon City, 1102 Metro Manila",
              "buttons":[
                {
                  "type":"postback",
                  "payload":"chat_tgp",
                  "title":"Chat"
                }
              ]           
          },
          {
            "title":"Generika Drugstore",
            "image_url":"http://pick-n-ride.000webhostapp.com/generika2.png",
            "subtitle":"1 Anonas Corner Molave STS. Project 3 Quezon City, 1121 Metro Manila",
              "buttons":[
                {
                  "type":"postback",
                  "payload":"chat_tgp",
                  "title":"Chat"
                }
              ]           
          },
          {
            "title":"Mercury Drug",
            "image_url":"http://pick-n-ride.000webhostapp.com/mercury.jpg",
            "subtitle":"1103 Scout Borromeo St Diliman, Quezon City, Metro Manila",
              "buttons":[
                {
                  "type":"postback",
                  "payload":"chat_tgp",
                  "title":"Chat"
                }
              ]           
          }                               
        ]
        }
      }
    }


  return callSendAPI(recipientId,response);

}


function showDoctorsSpecialization(recipientId) {

    let response;
 
    response = {
      "text":"What kind of doctor you are looking for?",
      "quick_replies":[
        {
          "content_type":"text",
          "title":"Pediatrician",
          "payload":"select_pediatrician"
        },
        {
          "content_type":"text",
          "title":"Ophthalmologist",
          "payload":"select_ophthalmologist"
        },
        {
          "content_type":"text",
          "title":"OB Gyne",
          "payload":"select_obgyne"
        },
        {
          "content_type":"text",
          "title":"Dermatologist",
          "payload":"select_dermatologist"
        },
        {
          "content_type":"text",
          "title":"Orthopedic",
          "payload":"select_orthopedic"
        },
        {
          "content_type":"text",
          "title":"Internal Med",
          "payload":"select_internalmed"
        },
        {
          "content_type":"text",
          "title":"General Med",
          "payload":"select_general_med"
        }
      ]
    }

  return callSendAPI(recipientId,response);
}


function getDoctors(recipientId,specialization) {

    let response;
 
    if(specialization == 'pediatrician') { 

      response = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
                {
                  "title":"Dr. Lavadia, Ma. Angela",
                  "image_url":"https://pick-n-ride.000webhostapp.com/doctor/lavadia.jpg",
                  "subtitle":"Pediatrician",
                  "buttons":[
                      {
                        "type":"postback",
                        "title":"Chat Now",
                        "payload":"doctor_lavadia"
                      }
                    ]
                },
                {
                  "title":"Dr. Manlongat, Tricia",
                  "image_url":"https://pick-n-ride.000webhostapp.com/doctor/manlongat1.jpg",
                  "subtitle":"Pediatrician",
                  "buttons":[
                      {
                        "type":"postback",
                        "title":"Chat Now",
                        "payload":"chat_manlongay"
                      }
                    ]
                },
                {
                  "title":"Dr. Prieto, Elizabeth",
                  "image_url":"https://pick-n-ride.000webhostapp.com/doctor/prieto.jpg",
                  "subtitle":"Pediatrician",
                  "buttons":[
                      {
                        "type":"postback",
                        "title":"Chat Now",
                        "payload":"chat_prieto"
                      }
                    ]
                },
                {
                  "title":"Dr. Dela Paz, Cecile",
                  "image_url":"https://pick-n-ride.000webhostapp.com/doctor/delapaz.jpg",
                  "subtitle":"Pediatrician",
                  "buttons":[
                      {
                        "type":"postback",
                        "title":"Chat Now",
                        "payload":"chat_delapaz"
                      }
                    ]
                }
              ]
          }
        }
      }

    }else if(specialization == 'ophthalmology') {

        response = {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
                {
                  "title":"Dr. Baquir, Allan Troy",
                  "image_url":"https://pick-n-ride.000webhostapp.com/doctor/baquir.jpg",
                  "subtitle":"Ophthalmologist",
                  "buttons":[
                      {
                        "type":"postback",
                        "title":"Chat Now",
                        "payload":"doctor_baquir"
                      }
                    ]
                },
                {
                  "title":"Dr. Duran, Samuel",
                  "image_url":"https://pick-n-ride.000webhostapp.com/doctor/duran.jpg",
                  "subtitle":"Ophthalmologist",
                  "buttons":[
                      {
                        "type":"postback",
                        "title":"Chat Now",
                        "payload":"chat_duran"
                      }
                    ]
                },
                {
                  "title":"Dr. Ordona, Dennis",
                  "image_url":"https://pick-n-ride.000webhostapp.com/doctor/ordona.jpg",
                  "subtitle":"Ophthalmologist",
                  "buttons":[
                      {
                        "type":"postback",
                        "title":"Chat Now",
                        "payload":"chat_ordona"
                      }
                    ]
                },
                {
                  "title":"Dr. Bueno, Emmmanuel",
                  "image_url":"https://pick-n-ride.000webhostapp.com/doctor/bueno.jpg",
                  "subtitle":"Ophthalmologist",
                  "buttons":[
                      {
                        "type":"postback",
                        "title":"Chat Now",
                        "payload":"chat_bueno"
                      }
                    ]
                }
              ]
          }
        }
      }

    }else {

      response = {
        "text":"Please select doctor specialization"
      }
    }

  return callSendAPI(recipientId,response);
}


function showLaboratory(recipientId) {

  let response;

  response = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
              {
                "title":"Health Wise Diagnostic Laboratory",
                "image_url":"https://pick-n-ride.000webhostapp.com/laboratory/healthwise.jpg",
                "subtitle":"Richtown Tower, Mayhaligue St, Tondo, Metro Manila, 1003 Metro Manila",
                "buttons":[
                    {
                      "type":"postback",
                      "title":"View Services",
                      "payload":"view_services_healthwise"
                    },
                    {
                      "type":"postback",
                      "title":"Chat Now",
                      "payload":"laboraotory_healthwise"
                    }
                  ]
              },
              {
                "title":"United Diagnostic Laboratory",
                "image_url":"https://pick-n-ride.000webhostapp.com/laboratory/intercon.png",
                "subtitle":"Taft Ave, Paco, Manila, 1000 Metro Manila",
                "buttons":[
                  {
                    "type":"postback",
                    "title":"View Services",
                    "payload":"view_services_intercon"
                  },
                    {
                      "type":"postback",
                      "title":"Chat Now",
                      "payload":"laboratory_intercon"
                    }
                  ]
              },
              {
                "title":"Singapore Diagnostics",
                "image_url":"https://pick-n-ride.000webhostapp.com/laboratory/singapore.png",
                "subtitle":"4F Sterling Centre, 131 Dela Rosa St (corner of Ormaza St), Legazpi Village, Makati, 1229 Metro Manila",
                "buttons":[
                    {
                      "type":"postback",
                      "title":"View Services",
                      "payload":"view_services_singapore"
                    },
                    {
                      "type":"postback",
                      "title":"Chat Now",
                      "payload":"laboratory_singapore"
                    }
                  ]
              },
              {
                "title":"Exact Check Diagnostic Center",
                "image_url":"https://pick-n-ride.000webhostapp.com/laboratory/exactcheck.jpg",
                "subtitle":"238 Banawe, Cor. Pagataan &, Panalturan, Quezon City, 1115 Metro Manila",
                "buttons":[
                    {
                      "type":"postback",
                      "title":"Views Services",
                      "payload":"view_services_exactcheck"
                    },
                    {
                      "type":"postback",
                      "title":"Chat Now",
                      "payload":"laboratory_exactcheck"
                    }
                  ]
              }
            ]
        }
      }
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


