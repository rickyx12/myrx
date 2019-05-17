<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Orders extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('orders_model');
		$this->load->model('utility_model');
		$this->load->library('session');
	}

	private function isLogged() {

		if(!$this->session->has_userdata('id')) {
			redirect('Account/login');
		}
	}

	public function index() {

		$this->isLogged();

		$data = array("page" => "orders-nav");

 		$this->load->view('includes/header.php',$data);
 		$this->load->view('orders/index');
 		$this->load->view('includes/footer.php');
	}

 	public function add() {

 		$this->isLogged();

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

 		$this->isLogged();

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

 		$this->isLogged();

 		$ordersArr = [];
 		$orders = $this->orders_model->getOrderRequest()->result();
 		$pharmacy = null;

 		foreach($orders as $order) {

 			if($this->utility_model->selectNow('myrx_pharmacy','name','id',$order->pharmacy)->row()) {
 				$pharmacy = $this->utility_model->selectNow('myrx_pharmacy','name','id',$order->pharmacy)->row()->name;
 			}else {
 				$pharmacy = "";
 			}

 			array_push($ordersArr,array(
 				"id" => $order->id,
 				"custId" => $order->customer,
 				"customer" => $this->utility_model->selectNow('myrx_customer','name','id',$order->customer)->row()->name ,
 				"contact" => $this->utility_model->selectNow('myrx_customer','contact_number','id',$order->customer)->row()->contact_number,
 				"facebook" => $this->utility_model->selectNow('myrx_customer','facebook_url','id',$order->customer)->row()->facebook_url,
 				"address" => $this->utility_model->selectNow('myrx_customer','address','id',$order->customer)->row()->address,
 				"pharmacy" => $this->utility_model->selectNow('myrx_pharmacy','name','id',$order->pharmacy)->row()->name
 				));
 		}

 		echo json_encode($ordersArr);
 	}

 	public function setPharmacy() {

 		$this->isLogged();

 		$customerId = $this->input->post('customerId');
 		$pharmacyId = $this->input->post('pharmacyId');

 		$this->orders_model->setPharmacy($pharmacyId,$customerId);

 		echo json_encode(array('status' => 'okay', 'message' => 'Pharmacy successfully added'));
 	}

 	public function delete() {

 		$this->isLogged();

 		$id = $this->input->post('orderId');

 		$this->orders_model->delete(array($id));

 		echo json_encode(array('status' => 'okay', 'message' => 'Successfully Deleted.'));
 	}

}
