
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

				var id = $('#orderBtn'+val.id).data('id');

				$("<form action='"+base_url+"Customer/viewOrderPage' method='POST'><input type='hidden' name='id' value='"+id+"'></form>").appendTo('body').submit();

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
			html += "</tr>";

		});

		$('#ordersTable').html(html);
	}

});
