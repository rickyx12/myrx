
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
 			
				html += "<tr>";
					html += "<td class='pharmacySearchResult'>"+val.name+"</td>";
					html += "<td class='pharmacySearchResult'>"+val.address+"</td>";
					html += "<td class='pharmacySearchResult'>"+val.contact_number+"</td>"
					html += "<td><input type='checkbox' name='fbId' value='"+val.facebook_id+"'></td>"
				html += "</tr>";
 				
 			});

 			$('#searchPharmaciesTbl').html(html);

		}

	});

});