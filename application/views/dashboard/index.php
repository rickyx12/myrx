  <div id="content-wrapper">

    <div class="container-fluid">

      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
      </ol>


    <div class="row">
      <div class="col-md-4">
        <div class="card text-center w-100">
          <div class="card-body">
            <h5 class="card-title">Orders</h5>
            <h2 class="card-text"><?= $totalOrders ?></h2>
            <!-- <a href="#" class="btn btn-primary w-50">View</a> -->
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center w-100">
          <div class="card-body">
            <h5 class="card-title">Pending</h5>
            <h2 class="card-text"><?= $pendingOrders ?></h2>
            <!-- <a href="#" class="btn btn-primary w-50">View</a> -->
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center w-100">
          <div class="card-body">
            <h5 class="card-title">Delivered</h5>
            <h2 class="card-text"><?= $deliveredOrders ?></h2>
            <!-- <a href="#" class="btn btn-primary w-50">View</a> -->
          </div>
        </div>
      </div>
    </div>

    <Br><br>

    <div class="row">
      <div class="col-md-4">
        <div class="card text-center w-100">
          <div class="card-body">
            <h5 class="card-title">Income</h5>
            <h2 class="card-text">₱<?= number_format((50 * $totalOrders),2) ?></h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center w-100">
          <div class="card-body">
            <h5 class="card-title">Receivables</h5>
            <h2 class="card-text">₱<?= number_format((50 * $pendingOrders),2) ?></h2>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-center w-100">
          <div class="card-body">
            <h5 class="card-title">Collected</h5>
            <h2 class="card-text">₱<?= number_format((50 * $deliveredOrders),2) ?></h2>
          </div>
        </div>
      </div>
    </div>


    </div>
  </div>