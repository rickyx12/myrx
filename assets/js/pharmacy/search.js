
var base_url = $('body').data('urlbase');

$('#locationSearchBtn').click(function(){

	pharmacyLocation = $('#pharmacyLocation').val();

 	var data = {
 		location:pharmacyLocation
 	}

	$.ajax({
		url:base_url+"Pharmacy/search",
		method:'POST',
		data:data,
		success:function(result) {
 			
 			var html = "";

 			$.each(JSON.parse(result),function(index,val) {
 				
				$(document).on('click','#orderDetailsBtn'+val.id,function(){
					
					var pharmaId = $('#orderDetailsBtn'+val.id).data('id');

					console.log(pharmaId);

					$.ajax({
						url:base_url+"Pharmacy/getOrders",
						method:'POST',
						data:{pharmacyId:pharmaId},
						success:function(result) {

							var html = "";

							$.each(JSON.parse(result),function(index,val) {

								html += "<tr>";
									html += "<td>"+val.name+"</td>";
									html += "<td>"+val.contact+"</td>";
									html += "<td>"+val.address+"</td>";
								html += "</tr>";

							});

							$('#orderDetailsTbl').html(html);

						}
					});

				});


				html += "<tr>";
					html += "<td class='pharmacySearchResult'>"+val.name+"</td>";
					html += "<td class='pharmacySearchResult'>"+val.address+"</td>";
					html += "<td class='pharmacySearchResult'>"+val.contact_number+"</td>"
					html += "<td align='center'><button id='orderDetailsBtn"+val.id+"' data-id='"+val.id+"' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#orderDetailsModal'>"+val.orders+"</button></td>";
					html += "<td><input type='checkbox'></td>"
				html += "</tr>";
 				
 			});

 			$('#searchPharmaciesTbl').html(html);

		}

	});

});