<div id="content-wrapper">
  <div class="container-fluid">

    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#">Customer</a>
      </li>
      <li class="breadcrumb-item active">New Order</li>
    </ol>

    <div class="row">
      <div class="col-md-12">
        <form id="uploadRx">
            <input type="file" id="rxInp" name="rxFile" id="fileToUpload">
        </form>
        <input type="hidden" id="custId" value="<?= $_POST['custId'] ?>">
      </div>    
    </div>

    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Rx Preview</label>
        </div>
        <div class="form-group" style="width: 500px; height: 500px;">
          <img id="rxPreview" style="width: 100%; height: 100%;">
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label>Message:</label>
        </div>
        <div class="form-group">
          <textarea id="message" cols="10" rows="20" class="form-control"></textarea>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-right">
        <button id="addOrderBtn" class="btn btn-success">Proceed</button>
      </div>
    </div>

	</div>

  </div>
 </div>

 <script src="<?= base_url('assets/js/customer/add-order.js') ?>"></script>