<div id="content-wrapper">
  <div class="container-fluid">

    <ol class="breadcrumb">
      <li class="breadcrumb-item active">
        <a href="#">Orders</a>
      </li>
    </ol>

    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Pharmacy</th>
              <th>Contact#</th>
              <th>Facebook</th>
              <th>Address</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody id="ordersTable"></tbody>
        </table>
      </div>
    </div>


  <!-- Modal -->
  <div id="orderModal" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 id="customerName" class="modal-title"></h4>
        </div>
        <div class="modal-body">
          <input type="hidden" id="ordering-customer">
          <div class="row mb-2">
            <div class="col-md-12">
              <select class="pharmacy-list" style="width: 500px;">
              </select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-6">
              <select id="deliveryType" class="form-control"></select>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-md-6">
              <input type="text" id="deliveryTime" class="form-control" autocomplete="off" placeholder="Delivery Time">
            </div>
          </div>
          <div id="orderField" style="height: 400px;"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>


  <div id="deleteModal" class="modal fade" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Delete</h4>
        </div>
        <div class="modal-body">
          <input type="hidden" id="orderId">
          Delete the order of <span id="customer"></span>?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">No</button>
          <button type="button" id="deleteOrder" class="btn btn-success" data-dismiss="modal">Yes</button>
        </div>
      </div>

    </div>
  </div>

  </div>
 </div>

<script src="<?= base_url('assets/js/orders/orders.js') ?>"></script>
