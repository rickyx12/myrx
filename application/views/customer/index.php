<div id="content-wrapper">
  <div class="container-fluid">

    <ol class="breadcrumb">
      <li class="breadcrumb-item active">
        <a href="#">Customer</a>
      </li>
    </ol>

    <div class="row">
 		<div class="col-md-4">
			<div class="input-group mb-3">
			  <input type="text" id="searchCustomerField" class="form-control" placeholder="Search Customer">
			  <div class="input-group-append">
			    <button class="btn btn-outline-secondary" type="button" id="searchCustomerBtn">Search</button>
			  </div>
			</div> 			
 		</div>
    	<div class="col-md-8 text-right">
    		<button class="btn btn-success" data-toggle="modal" data-target="#newCustomerModal">New <i class="fa fa-plus"></i></button>
    	</div>
    </div>


 	<div class="row">
 		<div class="col-md-12">
 			<table class="table table-bordered table-hover mt-3">
 				<thead>
 					<tr>
 						<td>Name</td>
 						<td>Address</td>
 						<td>ContactNo</td>
 						<td>Facebook</td>
 						<td></td>
 					</tr>
 				</thead>
 				<tbody id="customersTable"></tbody>
 			</table>
 		</div>
 	</div>


<!-- Modal -->
<div id="newCustomerModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">New Customer</h4>
      </div>
      <div class="modal-body">
        
 		<div class="form-group">
 			<label>Name</label>
 			<input type="text" id="name" class="form-control" autocomplete="off">
 		</div>

 		<div class="form-group">
 			<label>Address</label>
 			<input type="text" id="address" class="form-control" autocomplete="off">
 		</div>

 		<div class="form-group">
 			<label>Contact#</label>
 			<input type="text" id="contactNo" class="form-control" autocomplete="off">
 		</div>

 		<div class="form-group">
 			<label>Facebok/Messenger</label>
 			<input type="text" id="facebook" class="form-control" autocomplete="off">
 		</div> 		

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" id="newCustomerModalBtn" class="btn btn-success">Proceed</button>
      </div>
    </div>

  </div>
</div>

	</div>

  </div>
 </div>

 <script src="<?= base_url('assets/js/customer/customers-table.js') ?>"></script>
 <script src="<?= base_url('assets/js/customer/new-customer.js') ?>"></script>