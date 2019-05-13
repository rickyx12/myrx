
var base_url = $('body').data('urlbase');
var image_url = "https://pick-n-ride.000webhostapp.com/";
var access_token = "EAADuLIY8BksBALxFZA9SuJ5vshC6UB1mBmbwnjie1fkf4sXXeVfmiUZAuJoZAbM5NYmyo6PMByeuUibI7vK5TAib5uGC2hzj4BfbXZAFEUlwNSZA5TcbzcnNCWTkVEqkuZAx26MkirY85dext2casBL0s4x5R9Mj9ttxpsQe1IxwZDZD";


function sendMessage(recipient,message) {

	var data = {
		"recipient":{
			"id":recipient
		},
		"message":{
			"text":message
		}
	};

	$.ajax({
		url:"https://graph.facebook.com/v2.6/me/messages?access_token="+access_token,
		type:"POST",
		async:false,
		contentType: "application/json",
		data:data,
		success:function(result){
			console.log(result);
		}
	});
}

$('#broadcastBtn').click(function(){

	var fbId = [];
	var fbImage = [];
	var message = $('#message').val();
	var rxFile = $('#rxFile').val();


	$.each($("input[name='fbId']:checked"),function() {
		fbId.push($(this).val());
	});


	for(i =0; i < fbId.length; i++) {
		

		if(rxFile != "") {

			var imageData = {
				"recipient":{
					"id":fbId[i]
				},
				"message":{
					"attachment":{
						"type":"image",
						"payload":{
							"url":image_url+'/rx/'+rxFile,
							"is_reusable":true
						}
					}
				}
			}

			$.ajax({
				url:"https://graph.facebook.com/v2.6/me/messages?access_token="+access_token,
				type:"POST",
				async:false,
				contentType: "application/json",
				data:imageData,
				success:function(result) {
					sendMessage(fbId[i],message);
				}
			});

		
		}else {


			var data = {
				"recipient":{
					"id":fbId[i]
				},
				"message":{
					"text":message
				}
			};

			$.ajax({
				url:"https://graph.facebook.com/v2.6/me/messages?access_token="+access_token,
				type:"POST",
				contentType: "application/json",
				data:data,
				success:function(result){
					console.log(result);
				}
			});

		}

	}

});