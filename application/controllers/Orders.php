<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Orders extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('orders_model');
		$this->load->model('utility_model');
	}

	public function index() {

		$data = array("page" => "orders-nav");

 		$this->load->view('includes/header.php',$data);
 		$this->load->view('orders/index');
 		$this->load->view('includes/footer.php');
	}

 	public function add() {

 		$customer = $this->input->post('customer');
 		$pharmacy = $this->input->post('pharmacy');
 		$orders = $this->input->post('orders');
 		$orderDate = date("Y-m-d H:i:s");
 		$deliveryType = $this->input->post('deliveryType');
 		$deliveryTime = $this->input->post('deliveryTime');

 		if($customer != "" && $pharmacy != "" && $deliveryType != "") {

	 		$data = array($customer,$pharmacy,$orders,$orderDate,$deliveryType,$deliveryTime);

	 		$this->orders_model->create($data);

	 		echo json_encode(array("status" => "ok"));
 		}else {

 			echo json_encode(array("status" => "error", "message" => "Fill up all fields."));
 		}
 	}

 	public function getPendingOrders() {

 		$ordersArr = [];
 		$pendingOrders = $this->orders_model->getPendingOrders()->result();

 		foreach($pendingOrders as $order) {

 			array_push($ordersArr,array(
 				"id" => $order->id,
 				"customer" => $this->utility_model->selectNow('myrx_customer','name','id',$order->customer)->row()->name ,
 				"contact" => $this->utility_model->selectNow('myrx_customer','contact_number','id',$order->customer)->row()->contact_number,
 				"facebook" => $this->utility_model->selectNow('myrx_customer','facebook_url','id',$order->customer)->row()->facebook_url,
 				"address" => $this->utility_model->selectNow('myrx_customer','address','id',$order->customer)->row()->address,
 				"pharmacy" => $this->utility_model->selectNow('myrx_pharmacy','name','id',$order->pharmacy)->row()->name." (".$this->utility_model->selectNow('myrx_pharmacy','address','id',$order->pharmacy)->row()->address.")",
 				"deliveryType" => $order->delivery_type,
 				"deliveryTime" => $order->delivery_time,
 				"order" => $order->content 
 				));
 		}

 		echo json_encode($ordersArr);
 	}


 	public function getOrderRequest() {

 		$ordersArr = [];
 		$orders = $this->orders_model->getOrderRequest()->result();

 		foreach($orders as $order) {

 			array_push($ordersArr,array(
 				"id" => $order->id,
 				"custId" => $order->customer,
 				"customer" => $this->utility_model->selectNow('myrx_customer','name','id',$order->customer)->row()->name ,
 				"contact" => $this->utility_model->selectNow('myrx_customer','contact_number','id',$order->customer)->row()->contact_number,
 				"facebook" => $this->utility_model->selectNow('myrx_customer','facebook_url','id',$order->customer)->row()->facebook_url,
 				"address" => $this->utility_model->selectNow('myrx_customer','address','id',$order->customer)->row()->address
 				));
 		}

 		echo json_encode($ordersArr);
 	}

}
