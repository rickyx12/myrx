
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
	url:base_url+"Orders/getOrderRequest",
	method:'GET',
	success:function(result) {

		var html = ""

		$.each(JSON.parse(result),function(index,val) {


			$(document).on('click','#orderBtn'+val.id,function(){

				let id = $('#orderBtn'+val.id).data('id');

				$("<form action='"+base_url+"Customer/viewOrderPage' method='POST'><input type='hidden' name='id' value='"+id+"'></form>").appendTo('body').submit();

			});


			$(document).on('click','#deliveredBtn'+val.id,function(){

				let id = $('#deliveredBtn'+val.id).data('id');
				let customer = $('#deliveredBtn'+val.id).data('customer');

				$('#orderId').val(id);
				$('#customer').html('<b>'+customer+'</b>');

			});


			$(document).on('click','#deleteBtn'+val.id,function(){

				let id = $('#deleteBtn'+val.id).data('id');
				let customer = $('#deleteBtn'+val.id).data('customer');

				$('#customerName').html(customer);
				$('#orderId').val(id);
				$('#customer').html('<b>'+customer+'</b>');

			});


			html += "<tr>";

				html += "<td>"+val.customer+"</td>";
				html += "<td>"+val.pharmacy+"</td>";
				html += "<td>"+val.contact+"</td>";

				if(val.facebook != '') {
					html += "<td align='center'><a href='"+val.facebook+"' target='_blank'><img src='"+base_url+"/assets/img/fb.png' height='40px' width='40px'></a></td>";
				}else{
					html += "<td></td>";
				}

				html += "<td>"+val.address+"</td>";
				html += "<td><button id='orderBtn"+val.id+"' class='btn btn-primary' data-id='"+val.id+"'><i class='fa fa-list'></i></button></td>";
				
				if(val.pharmacy == "") {
					html += "<td><button id='deleteBtn"+val.id+"' class='btn btn-danger' data-id='"+val.id+"' data-customer='"+val.customer+"' data-toggle='modal' data-target='#deleteModal'><i class='fa fa-trash'></i></button></td>";
				}else {
					html += "<td><button id='deliveredBtn"+val.id+"' class='btn btn-success' data-id='"+val.id+"' data-customer='"+val.customer+"' data-toggle='modal' data-target='#deliveredModal'><i class='fa fa-check'></i></button></td>";
				}

			html += "</tr>";

		});

		$('#ordersTable').html(html);
	}

});


$('#deliveredOrderBtn').click(function(){

	let orderId = $('#orderId').val();

	let data = {
		orderId:orderId
	}

	$.ajax({
		url:base_url+'Orders/delivered',
		type:'POST',
		data:data,
		success:function(result) {

			let res = JSON.parse(result);
			let html = '';

			if(res.status == 'okay') {

				swal('Success!',res.message,'success');

				$.ajax({
					url:base_url+"Orders/getOrderRequest",
					method:'GET',
					success:function(result) {

						let res = JSON.parse(result);
						let html = '';

						$.each(res,function(index,val) {

							html += "<tr>";

								html += "<td>"+val.customer+"</td>";
								html += "<td>"+val.pharmacy+"</td>";
								html += "<td>"+val.contact+"</td>";

								if(val.facebook != '') {
									html += "<td align='center'><a href='"+val.facebook+"' target='_blank'><img src='"+base_url+"/assets/img/fb.png' height='40px' width='40px'></a></td>";
								}else{
									html += "<td></td>";
								}

								html += "<td>"+val.address+"</td>";
								html += "<td><button id='orderBtn"+val.id+"' class='btn btn-primary' data-id='"+val.id+"'><i class='fa fa-list'></i></button></td>";
								
								if(val.pharmacy == "") {
									html += "<td><button id='deleteBtn"+val.id+"' class='btn btn-danger' data-id='"+val.id+"' data-customer='"+val.customer+"' data-toggle='modal' data-target='#deleteModal'><i class='fa fa-trash'></i></button></td>";
								}else {
									html += "<td></td>";
								}

							html += "</tr>";

						});

						$('#ordersTable').html(html);
					}
				});				

			}else {
				swal('Error!','Error!!','error');
			}
			
		}
	});

});

$('#deleteOrder').click(function() {

	let orderId = $('#orderId').val();

	let data = {
		orderId:orderId
	}

	$.ajax({
		url:base_url+'Orders/delete',
		type:'POST',
		data:data,
		success:function(result) {

			let res = JSON.parse(result);
			let html = '';

			if(res.status == 'okay') {

				swal('Success!',res.message,'success');

				$.ajax({
					url:base_url+"Orders/getOrderRequest",
					method:'GET',
					success:function(result) {

						let res = JSON.parse(result);
						let html = '';

						$.each(res,function(index,val) {

							html += "<tr>";

								html += "<td>"+val.customer+"</td>";
								html += "<td>"+val.pharmacy+"</td>";
								html += "<td>"+val.contact+"</td>";

								if(val.facebook != '') {
									html += "<td align='center'><a href='"+val.facebook+"' target='_blank'><img src='"+base_url+"/assets/img/fb.png' height='40px' width='40px'></a></td>";
								}else{
									html += "<td></td>";
								}

								html += "<td>"+val.address+"</td>";
								html += "<td><button id='orderBtn"+val.id+"' class='btn btn-primary' data-id='"+val.id+"'><i class='fa fa-list'></i></button></td>";
								
								if(val.pharmacy == "") {
									html += "<td><button id='deleteBtn"+val.id+"' class='btn btn-danger' data-id='"+val.id+"' data-customer='"+val.customer+"' data-toggle='modal' data-target='#deleteModal'><i class='fa fa-trash'></i></button></td>";
								}else {
									html += "<td></td>";
								}

							html += "</tr>";

						});

						$('#ordersTable').html(html);
					}
				});				

			}else {
				swal('Error!','Error!!','error');
			}

		}
	});

});