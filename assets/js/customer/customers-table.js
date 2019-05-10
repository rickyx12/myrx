
var base_url = $('body').data('urlbase');

$.ajax({
	url:base_url+"Customer/latest",
	method:'GET',
	success:function(result) {

			var html = "";

			$.each(JSON.parse(result),function(index,val) {
				
			$(document).on('click','#orderBtn'+val.id,function(){

				var custId = $('#orderBtn'+val.id).data('customerid');
				var custName = $('#orderBtn'+val.id).data('customername');


				$('#ordering-customer').val(custId);
				$('#customerName').html(custName);
			});


			html += "<tr>";
				html += "<td>"+val.name+"</td>";
				html += "<td>"+val.address+"</td>";
				html += "<td>"+val.contact_number+"</td>";

				if(val.facebook_url != '') {
					html += "<td align='center'><a href='"+val.facebook_url+"' target='_blank'><img src='"+base_url+"/assets/img/fb.png' height='40px' width='40px'></a></td>";
				}else{
					html += "<td></td>";
				}
				html += "<td><button id='orderBtn"+val.id+"' class='btn btn-primary' data-customername='"+val.name+"' data-customerid='"+val.id+"' data-toggle='modal' data-target='#orderModal'><i class='fa fa-plus'></i></button></td>";
			html += "</tr>";
				
			});

			$('#customersTable').html(html);

	}

});

var toolbarOptions = [
  ['bold','image']
];


  var quill = new Quill('#orderField', {
  	modules: { 'toolbar': toolbarOptions },
    theme: 'snow'
  });



$.ajax({
	url:base_url+"Pharmacy/list",
	method:'GET',
	success:function(result) {

 		var data = JSON.parse(result);

		console.log(data);

		$('.pharmacy-list').select2({
			placeholder:'Select Pharmacy',
			data:data
		}); 

	}

});

$('#orderModalBtn').click(function(){

	var pharmacy = $("select.pharmacy-list option").filter(":selected").val();
	var customer = $('#ordering-customer').val();
	var orders = quill.getContents();
	var deliveryType = $("select#deliveryType option").filter(":selected").text();
	var deliveryTime = $('#deliveryTime').val();


	var data = {
		pharmacy:pharmacy,
		customer:customer,
		orders:JSON.stringify(orders),
		deliveryType:deliveryType,
		deliveryTime:deliveryTime
	};

	$.ajax({
		url:base_url+"Orders/add",
		method:'POST',
		data:data,
		success:function(result) {

			if(JSON.parse(result).status == "ok") {
				$('#orderModal').modal('hide');
				quill.setContents([{ insert: '\n' }]);
				$("#pharmacy-list").val('').trigger('change')
				swal("Success!", "Order has been listed!", "success");
			}else {
				$('#orderModal').modal('hide');
				swal("Error!",JSON.parse(result).message, "error");
			}
		

		}
	});

});

$('#deliveryTime').hide();

$('#deliveryType').change(function() {
    if ($(this).val() === 'On-Demand Delivery') {
        $('#deliveryTime').show();
    }else {
    	$('#deliveryTime').hide();
    }
});