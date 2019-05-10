
var base_url = $('body').data('urlbase');

$('#newCustomerModalBtn').click(function(){

	var name = $('#name').val();
	var address = $('#address').val();
	var contact = $('#contactNo').val();
	var facebook = $('#facebook').val();

	var data = {
		name:name,
		address:address,
		contact:contact,
		facebook:facebook
	}

 	$.ajax({
		url:base_url+"Customer/add",
		method:'POST',
		data:data,
		success:function(result) {

			if(JSON.parse(result).status == "ok") {

	 			$('#newCustomerModal').modal('hide');
	 			$('#name').val("");
	 			$('#address').val("");
	 			$('#contactNo').val("");
	 			$('#facebook').val("");

	 			swal("Success!", "Customer added!", "success");

				$.ajax({
					url:base_url+"Customer/latest",
					method:'GET',
					success:function(result) {

							var html = "";

							$.each(JSON.parse(result),function(index,val) {
								
							html += "<tr>";
								html += "<td class='pharmacySearchResult'>"+val.name+"</td>";
								html += "<td class='pharmacySearchResult'>"+val.address+"</td>";
								html += "<td class='pharmacySearchResult'>"+val.contact_number+"</td>";
								html += "<td class='pharmacySearchResult'>"+val.facebook_url+"</td>";
								html += "<td><button id='orderBtn"+val.id+"' class='btn btn-primary' data-customerid='"+val.id+"' data-toggle='modal' data-target='#orderModal'><i class='fa fa-list'></i></button></td>";

							html += "</tr>";
								
							});

							$('#customersTable').html(html);

					}

				});

			}else {
				swal("Error!",JSON.parse(result).message, "error");
			}


		}
 	});

});


$('#searchCustomerBtn').click(function() {

	var customerName = $('#searchCustomerField').val();

 	var data = {
 		name:customerName
 	}

 	$.ajax({
		url:base_url+"Customer/search",
		method:'POST',
		data:data,
		success:function(result){

			var html = "";

			$.each(JSON.parse(result),function(index,val) {
				
			html += "<tr>";
				html += "<td>"+val.name+"</td>";
				html += "<td>"+val.address+"</td>";
				html += "<td>"+val.contact_number+"</td>";

				if(val.facebook_url != '') {
					html += "<td align='center'><a href='"+val.facebook_url+"' target='_blank'><img src='"+base_url+"/assets/img/fb.png' height='40px' width='40px'></a></td>";
				}else{
					html += "<td></td>";
				}
				html += "<td><button id='orderBtn"+val.id+"' class='btn btn-primary' data-customerid='"+val.id+"' data-toggle='modal' data-target='#orderModal'><i class='fa fa-list'></i></button></td>";

			html += "</tr>";
				
			});

			$('#customersTable').html(html);

		}
	});	

});