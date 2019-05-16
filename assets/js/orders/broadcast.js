
var base_url = $('body').data('urlbase');
var access_token = "EAAR0oeXVZCIUBAIz6BrFVhAR19YZBM1pdCIL1zElT5cm0XRsgZCYI4J7pz4o31nKbM1ZBl0NTB5Fy9tQPZActJo51BjfLnDPy4lhQnIuIu2AZAQd1u5qbmXiIIM0gW359Bw3q9evvjedIM2PBJFTOuzla9YJMN6h5ZC8qVUoR3WBrJKak5ub7JW";

$('#sendingLoader').hide();

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

$('#broadcastBtn').click(function() {

	var fbId = [];
	var fbImage = [];
	var message = $('#message').val();
	var rxFile = $('#rxFile').val();


	if($("input[name='fbId']:checked").length > 0) {

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
								"url":base_url+'/uploads/'+rxFile,
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

				sendMessage(fbId[i],message);
			}
		}

		swal('Success!','Prescription has been broadcasted to selected pharmacies','success');

	}else {
		swal('Ooops!','Please select a pharmacy first','error');
	}



});

$("#checkAll").click(function(){
    $('input:checkbox').not(this).prop('checked', this.checked);
});


$('#setPharmacyNowBtn').click(function() {

	let customerId = $('#customerId').val();
	let pharmacyId = $('#pharmacyId').val();

	let data = {
		customerId:customerId,
		pharmacyId:pharmacyId
	}


	$.ajax({
		url:base_url+'Orders/setPharmacy',
		type:'POST',
		data:data,
		success:function(result) {

			let res = JSON.parse(result);

			if(res.status == 'okay') {

				swal('success',res.message,'success');
				$('#setPharmacyModal').modal('hide');
			}else {

				swal('error','ERROR!','error');
			}

		}
	});

});