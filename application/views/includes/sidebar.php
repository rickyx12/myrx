    
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="sidebar navbar-nav">

      <?php if($page == "dashboard-nav"): ?>
        <li id="dashboard-nav" class="nav-item active">
      <?php else: ?>
        <li id="dashboard-nav" class="nav-item">
      <?php endif; ?>

        <a id="dashboard" class="nav-link" href="<?= base_url('Dashboard/index') ?>">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>

      <?php if($page == "pharmacy-nav"): ?>
        <li id="pharmacy-nav" class="nav-item active">
      <?php else: ?>
        <li id="pharmacy-nav" class="nav-item">
      <?php endif; ?>

        <a id="pharmacy" class="nav-link" href="<?= base_url('Pharmacy/find') ?>">
          <i class="fas fa-fw fa-laptop-medical"></i>
          <span>Pharmacy</span></a>
      </li>
      
      <?php if($page == "customer-nav"): ?>
        <li id="customer-nav" class="nav-item active">
      <?php else: ?>
        <li id="customer-nav" class="nav-item">
      <?php endif; ?>

        <a class="nav-link" href="<?= base_url('Customer/index') ?>">
          <i class="fas fa-fw fa-users"></i>
          <span>Customer</span></a>
      </li>

      <?php if($page == "orders-nav"): ?>
        <li id="orders-nav" class="nav-item active">
      <?php else: ?>
        <li id="orders-nav" class="nav-item">
      <?php endif; ?>

        <a class="nav-link" href="<?= base_url('Orders/index') ?>">
          <i class="fas fa-fw fa-prescription"></i>
          <span>Orders</span></a>
      </li>

    </ul>
