<div id="content-wrapper">
  <div class="container-fluid">

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#">Pharmacy</a>
      </li>
    </ol>

 	<div class="row">
 		<div class="col-md-5">
			<div class="input-group mb-3">
			  <input type="text" id="pharmacyLocation" class="form-control" placeholder="Pharmacy around vicinity" aria-label="Recipient's username" aria-describedby="button-addon2">
			  <div class="input-group-append">
			    <button class="btn btn-outline-secondary" type="button" id="locationSearchBtn1">Search</button>
			  </div>
			</div>
		</div>
		<div class="col-md-7 text-right">
			<button class="btn btn-success" data-toggle="modal" data-target="#newPharmacyModal">New <i class="fa fa-plus"></i></button>
		</div>
	</div>

 	<div class="row">
	 	<div class="col-md-8">
			<table class="table table-bordered table-hover">
				<thead>
					<th>Name</th>
					<th>Address</th>
					<th>Contact#</th>
				</thead>
				<tbody id="searchPharmaciesTbl"></tbody>
			</table>
		</div>
		<div class="col-md-4">
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


	<!-- Modal -->
	<div id="newPharmacyModal" class="modal fade" role="dialog">
	  <div class="modal-dialog">

	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <h4 class="modal-title">New Pharmacy</h4>
	      </div>
	      <div class="modal-body">
	        <div class="form-group">
	        	<label>Name</label>
	        	<input type="text" id="name" class="form-control">
	        </div>
	        <div class="form-group">
	        	<label>Address</label>
	        	<input type="text" id="address" class="form-control">
	        </div>
	        <div class="form-group">
	        	<label>Contact#</label>
	        	<input type="text" id="contactNumber" class="form-control">
	        </div>
	        <div class="form-group">
	        	<label>Contact Person</label>
	        	<input type="text" id="contactPerson" class="form-control">
	        </div>
	        <div class="form-group">
	        	<label>Facebook ID</label>
	        	<input type="text" id="facebookId" class="form-control">
	        </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
	        <button type="button" id="addPharmacyBtn" class="btn btn-success">Proceed</button>
	      </div>
	    </div>

	  </div>
	</div>


  </div>
 </div>

 <script src="<?= base_url('assets/js/pharmacy/search.js') ?>"></script>
 <script src="<?= base_url('assets/js/pharmacy/add-pharmacy.js') ?>"></script>