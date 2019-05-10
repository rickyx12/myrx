<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Customer extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('customer_model');
	}

 	public function index() {

 		$data = array("page" => "customer-nav");

 		$this->load->view('includes/header.php',$data);
 		$this->load->view('customer/index');
 		$this->load->view('includes/footer.php');

 	}

 	public function add() {

 		$name = $this->input->post('name');
 		$address = $this->input->post('address');
 		$contact = $this->input->post('contact');
 		$facebook = $this->input->post('facebook');
 		$dateAdded = date('Y-m-d');

 		if($name != "" && $address != "" && $contact != "" && $facebook != "") {

	 		$data = array($name,$address,$contact,$dateAdded,$facebook);

	 		$this->customer_model->create($data);

	 		echo json_encode(array("status" => "ok"));
 		} else {

 			echo json_encode(array("status" => "error", "message" => "Fill up all fields"));
 		}
 	}

 	public function latest() {

 		$customers = $this->customer_model->getCustomers()->result();

 		echo json_encode($customers);
 	}

 	public function search() {

 		$name = $this->input->post('name');

 		$result = $this->customer_model->search($name)->result();

 		echo json_encode($result);
 	}


}
