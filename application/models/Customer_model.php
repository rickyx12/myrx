<?php

class Customer_model extends CI_Model {

        public function __construct() {
                $this->load->database();
        }

	public function create($data) {
		$sql = "INSERT INTO myrx_customer(name,address,contact_number,dateAdded,facebook_url) VALUES (?,?,?,?,?)";
		$this->db->query($sql, $data);			
	}

	public function getCustomers() {
		
		$sql = "SELECT * FROM myrx_customer ORDER BY dateAdded,id DESC LIMIT 0,10 ";
		return $this->db->query($sql);
	}

	public function getCustomerDetails($id) {

		$custId = $this->db->escape_str($id);

		$sql = "SELECT * FROM myrx_customer WHERE id = ".$custId." ";
		return $this->db->query($sql);
	}

	public function search($customer) {

 		$cust = $this->db->escape_str($customer);

		$sql = "SELECT * FROM myrx_customer WHERE name LIKE '".$cust."%' ORDER BY dateAdded,id DESC";
		return $this->db->query($sql);		
	}

	public function addOrderRequest($data) {
		$sql = "INSERT INTO myrx_order_request(customer,rx,message,details) VALUES (?,?,?,?)";
		$this->db->query($sql, $data);
		return $this->db->insert_id();		
	}

}