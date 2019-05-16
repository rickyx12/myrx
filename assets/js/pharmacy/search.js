
var base_url = $('body').data('urlbase');

//from Pharmacy menu
$('#locationSearchBtn1').click(function() {

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
 			
				html += "<tr>";
					html += "<td class='pharmacySearchResult'>"+val.name+"</td>";
					html += "<td class='pharmacySearchResult'>"+val.address+"</td>";
					html += "<td class='pharmacySearchResult'>"+val.contact_number+"</td>"
				html += "</tr>";
 				
 			});

 			$('#searchPharmaciesTbl').html(html);

		}

	});

});


//from Orders menu
$('#locationSearchBtn').click(function() {

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
 			
			$(document).on('click','#setPharmacy'+val.id,function(){

				let id = $('#setPharmacy'+val.id).data('id');
				let name = $('#setPharmacy'+val.id).data('name');

				$('#pharmacyName').html("<b>"+name+"</b>");
				$('#pharmacyId').val(id);

			});


				html += "<tr>";
					html += "<td class='pharmacySearchResult'><a href='#' id='setPharmacy"+val.id+"' data-id='"+val.id+"' data-name='"+val.name+"' data-toggle='modal' data-target='#setPharmacyModal' style='text-decoration:none; color:black'>"+val.name+"</a></td>";
					html += "<td class='pharmacySearchResult'>"+val.address+"</td>";
					html += "<td class='pharmacySearchResult'>"+val.contact_number+"</td>";
					html += "<td><input type='checkbox' name='fbId' value='"+val.facebook_id+"'></td>";
				html += "</tr>";
 				
 			});

 			$('#searchPharmaciesTbl').html(html);

		}

	});

});