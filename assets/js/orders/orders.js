
var base_url = $('body').data('urlbase');

var toolbarOptions = [
  ['bold','image']
];


  var quill = new Quill('#orderField', {
  	modules: { 'toolbar': toolbarOptions },
    theme: 'snow'
  });

$('.pharmacy-list').select2(); 

$.ajax({
	url:base_url+"Orders/getPendingOrders",
	method:'GET',
	success:function(result) {

		var html = ""

		$.each(JSON.parse(result),function(index,val) {

			$(document).on('click','#orderBtn'+val.id,function(){

				var customer = $('#orderBtn'+val.id).data('customer');
				var pharmacy = $('#orderBtn'+val.id).data('pharmacy');
				var deliveryType = $('#orderBtn'+val.id).data('deliverytype');
				var deliveryTime = $('#orderBtn'+val.id).data('deliverytime');
				var order = $('#orderBtn'+val.id).data('content');

				$('#customerName').html(customer);
				$('.pharmacy-list').html("<option>"+pharmacy+"</option>");
				$('#deliveryType').html("<option>"+deliveryType+"</option>");
				quill.setContents(order);

				if(deliveryType == "On-Demand Delivery") {
					$('#deliveryTime').show();
					$('#deliveryTime').val(deliveryTime);
				}else {
					$('#deliveryTime').hide();
				}

			});

			html += "<tr>";

				if(val.deliveryType == "On-Demand Delivery") {
					html += "<td>"+val.customer+"<br><span style='font-size:13px; color:red;'>(Deliver @ "+val.deliveryTime+")</span></td>";
				}else {
					html += "<td>"+val.customer+"</td>";
				}

				html += "<td>"+val.pharmacy+"</td>";
				html += "<td>"+val.contact+"</td>";

				if(val.facebook != '') {
					html += "<td align='center'><a href='"+val.facebook+"' target='_blank'><img src='"+base_url+"/assets/img/fb.png' height='40px' width='40px'></a></td>";
				}else{
					html += "<td></td>";
				}

				html += "<td>"+val.address+"</td>";
				html += "<td><button id='orderBtn"+val.id+"' class='btn btn-primary' data-customer='"+val.customer+"' data-pharmacy='"+val.pharmacy+"' data-deliverytype='"+val.deliveryType+"' data-deliverytime='"+val.deliveryTime+"' data-content='"+val.order+"' data-toggle='modal' data-target='#orderModal'><i class='fa fa-list'></i></button></td>";
			html += "</tr>";

		});

		$('#ordersTable').html(html);
	}

});
