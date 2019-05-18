<div id="content-wrapper">
  <div class="container-fluid">

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#">Orders</a>
      </li>
      <li class="breadcrumb-item active"><?= $customer ?></li>
    </ol>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <h3>Rx</h3>
          <input type="hidden" id="rxFile" value="<?= $data->rx ?>">
        </div>
        <div class="form-group" style="width: 500px; height: 500px;">
          <img id="rxPreview" src="<?= base_url("uploads/rx/".$data->rx) ?>" style="width: 100%; height: 100%;">
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label>Message:</label>
        </div>
        <div class="form-group">
          <textarea id="message" cols="10" rows="20" class="form-control"><?= $data->message ?></textarea>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-5">
        <div class="input-group mb-3">
          <input type="text" id="pharmacyLocation" class="form-control" placeholder="Pharmacy around vicinity" aria-label="Recipient's username" aria-describedby="button-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" id="locationSearchBtn">Search</button>
          </div>
        </div>
      </div>
      <div class="col-md-7 text-right">
        <input type="checkbox" id="checkAll"> Check All
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered table-hover">
          <thead>
            <th>Name</th>
            <th>Address</th>
            <th>Contact#</th>
            <th>B</th>
          </thead>
          <tbody id="searchPharmaciesTbl"></tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-right">
        <button id="broadcastBtn" class="btn btn-success">(B) Broadcast</button>
      </div>
    </div>    


  <div id="setPharmacyModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Pharmacy</h4>
        </div>
        <div class="modal-body">
          <input type="hidden" id="pharmacyId">
          <input type="hidden" id="orderId" value="<?= $data->id ?>">
          <p>Set <span id="pharmacyName"></span> as Vendor for <b><?= $customer ?></b>?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">No</button>
          <button type="button" id="setPharmacyNowBtn" class="btn btn-success">Yes</button>
        </div>
      </div>

    </div>
  </div>



	</div>

  </div>
 </div>

<script src="<?= base_url('assets/js/pharmacy/search.js') ?>"></script>
<script src="<?= base_url('assets/js/orders/broadcast.js') ?>"></script>