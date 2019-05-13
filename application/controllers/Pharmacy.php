<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pharmacy extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('pharmacy_model');
		$this->load->model('customer_model');
	}

 	public function find() {

 		$data = array("page" => "pharmacy-nav");

 		$this->load->view('includes/header.php',$data);
 		$this->load->view('pharmacy/find_pharmacy');
 		$this->load->view('includes/footer.php');

 	}

 	public function search() {

 		$dataArr = [];
 		$location = $this->input->post('location');
		$result = $this->pharmacy_model->search_pharmacy($location)->result();

		foreach($result as $res) {
			array_push($dataArr,['id' => $res->id, 'name' => $res->name, 'address' => $res->address, 'contact_number' => $res->contact_number, 'facebook_id' => $res->facebook_id]);
		}
 		
 		echo json_encode($dataArr);

 	}

 	public function getOrders() {

 		$dataArr = [];
 		$pharmacyId = $this->input->post('pharmacyId');
 		$result = $this->pharmacy_model->getOrders($pharmacyId)->result();

 		foreach($result as $res) {
 			array_push($dataArr, ['name' => $this->customer_model->getCustomerDetails($res->customer)->row()->name, 'contact' => $this->customer_model->getCustomerDetails($res->customer)->row()->contact_number, 'address' => $this->customer_model->getCustomerDetails($res->customer)->row()->address]);
 		}


 		echo json_encode($dataArr);
 	}

 	public function list_pharma() {

 		$dataArr = [];
 		$result = $this->pharmacy_model->list_pharma()->result();
 		
 		foreach($result as $res) {
 			array_push($dataArr,["id" => $res->id,"text" => $res->name." (".$res->address.")", "facebookId" => $res->facebook_id]);
 		}

 		echo json_encode($dataArr);

 	}


}
