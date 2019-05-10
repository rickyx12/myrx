<div id="content-wrapper">
  <div class="container-fluid">

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#">Pharmacy</a>
      </li>
      <li class="breadcrumb-item active">Locations</li>
    </ol>

 	<div class="row">
 		<div class="col-md-5">
			<div class="input-group mb-3">
			  <input type="text" id="pharmacyLocation" class="form-control" placeholder="Pharmacy around vicinity" aria-label="Recipient's username" aria-describedby="button-addon2">
			  <div class="input-group-append">
			    <button class="btn btn-outline-secondary" type="button" id="locationSearchBtn">Search</button>
			  </div>
			</div>
		</div>
	</div>

 	<div class="row">
	 	<div class="col-md-8">
			<table class="table table-bordered table-hover">
				<thead>
					<th>Name</th>
					<th>Address</th>
					<th>Contact#</th>
					<th>Orders</th>
					<th></th>
				</thead>
				<tbody id="searchPharmaciesTbl"></tbody>
			</table>
		</div>
		<div class="col-md-4">
			<textarea class="form-control" rows="4" cols="47"></textarea>
			<div class="text-right mt-1">
				<button class="btn btn-primary">Send</button>
			</div>
		</div>
	</div>


	<!-- Modal -->
	<div id="orderDetailsModal" class="modal fade" role="dialog">
	  <div class="modal-dialog modal-lg">

	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <h4 class="modal-title">Order Details</h4>
	      </div>
	      <div class="modal-body">
	       
	      	<table class="table table-bordered table-striped">
	      		<thead>
	      			<tr>
	      				<th>Name</th>
	      				<th>Contact#</th>
	      				<th>Address</th>
	      			</tr>
	      		</thead>
	      		<tbody id="orderDetailsTbl"></tbody>
	      	</table>

	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
	      </div>
	    </div>

	  </div>
	</div>

  </div>
 </div>

 <script src="<?= base_url('assets/js/pharmacy/search.js') ?>"></script>