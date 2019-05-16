
var base_url = $('body').data('urlbase');

$('#addOrderBtn').click(function(){

	var form = $('#uploadRx')[0];
	var formData = new FormData(form);

	var custId = $('#custId').val();
	var message = $('#message').val();

	formData.append('custId',custId);
	formData.append('message',message);

	$.ajax({
		type:'POST',
		enctype:'multipart/form-data',
		url:base_url+'Customer/orderRequest',
		data:formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success:function(result) {

        	var res = JSON.parse(result);

        	if(res.status == 'success') {
        		swal('Success!',res.message,'success').then(() => {

                    var orderId = JSON.parse(result).orderId;

                    $("<form action='"+base_url+"Customer/viewOrderPage' method='POST'><input type='hidden' name='id' value='"+orderId+"'></form>").appendTo('body').submit();
                });
        	}else {
        		swal('Error!',res.message,'error');
        	}

        }		
	});


});


function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#rxPreview').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#rxInp").change(function() {
  readURL(this);
});