<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Customer extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->helper('url');
		$this->load->model('customer_model');
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

 		$data = array("page" => "customer-nav");

 		$this->load->view('includes/header.php',$data);
 		$this->load->view('customer/index');
 		$this->load->view('includes/footer.php');

 	}

 	public function addOrderPage() {

                $this->isLogged();

 		$data = array("page" => "customer-nav");

 		$this->load->view('includes/header.php',$data);
 		$this->load->view('customer/add-order');
 		$this->load->view('includes/footer.php');

 	}

 	public function orderRequest() {

                $this->isLogged();

                // $config['upload_path']          = 'C:/xampp/htdocs/myrx/uploads/rx';
                $config['upload_path']          = './uploads/rx/';
                $config['allowed_types']        = 'jpg|png';
                $config['max_size']             = 25000;
                $config['max_width']            = 0;
                $config['max_height']           = 0;

                $this->load->library('upload', $config);

                if ( ! $this->upload->do_upload('rxFile'))
                {
                	echo json_encode(array("status" => "error", "message" => $this->upload->display_errors()));
                }
                else
                {

                	$custId = $this->input->post('custId');
                	$message = $this->input->post('message');
                	$filename = $this->upload->data()['file_name'];

                	$data = array($custId,$filename,$message,date('Y-m-d'));
                	$lastInsertedId = $this->customer_model->addOrderRequest($data);

                	echo json_encode(array("status" => "success", "message" => "Sucessfully Added","orderId" => $lastInsertedId));
                        // print_r($this->upload->data());
                }
 	}

 	public function add() {

                $this->isLogged();

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

                $this->isLogged();

 		$customers = $this->customer_model->getCustomers()->result();

 		echo json_encode($customers);
 	}

 	public function search() {

                $this->isLogged();

 		$name = $this->input->post('name');

 		$result = $this->customer_model->search($name)->result();

 		echo json_encode($result);
 	}

        public function viewOrderPage() {

                $this->isLogged();

                $id = $this->input->post('id');
                $customerId = $this->utility_model->selectNow('myrx_order_request','customer','id',$id)->row()->customer;


                $orderRequest = $this->orders_model->getSingleOrderRequest($id)->row();
                $customer = $this->utility_model->selectNow('myrx_customer','name','id',$customerId)->row()->name;

                $data = array("page" => "orders-nav", "data" => $orderRequest, "customer" => $customer, "customerId" => $customerId);

                $this->load->view('includes/header.php',$data);
                $this->load->view('customer/view-order');
                $this->load->view('includes/footer.php');                
        }


}
