<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 		$this->load->model('orders_model');
 	}

	public function index()
	{

		$totalOrders = $this->orders_model->getAllOrderRequest(date("Y-m-d"))->num_rows();
		$pendingOrders = $this->orders_model->getOrderRequest(date("Y-m-d"))->num_rows();
		$deliveredOrders = $this->orders_model->getDeliveredOrderRequest(date("Y-m-d"))->num_rows();


 		$data = array(
 			"page" => "dashboard-nav", 
 			'totalOrders' => $totalOrders,
 			'pendingOrders' => $pendingOrders,
 			'deliveredOrders' => $deliveredOrders
 		);

		$this->load->view('includes/header',$data);
		$this->load->view('dashboard/index');
		$this->load->view('includes/footer');
	}
}
