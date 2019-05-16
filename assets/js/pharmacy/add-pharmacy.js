

var base_url = $('body').data('urlbase');

$('#addPharmacyBtn').click(function(){

	let name = $('#name').val();
	let address = $('#address').val();
	let contactNumber = $('#contactNumber').val();
	let contactPerson = $('#contactPerson').val();
	let facebookId = $('#facebookId').val();

	let data = {
		name:name,
		address:address,
		contactNumber:contactNumber,
		contactPerson:contactPerson,
		facebookId:facebookId
	};

	$.ajax({
		url:base_url+'Pharmacy/add',
		type:'POST',
		data:data,
		success:function(result) {

			var res = JSON.parse(result);

			if(res.status == 'okay') {
				swal('Success!',res.message,'success');
				$('#newPharmacyModal').modal('hide');
			}else {
				swal('Error!',res.message,'error')
			}
		}
	});

});