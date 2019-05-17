<?php

class Orders_model extends CI_Model {

    public function __construct() {
            $this->load->database();
    }

	public function create($data) {
		$sql = "INSERT INTO myrx_orders(customer,pharmacy,content,orderDate,delivery_type,delivery_time) VALUES (?,?,?,?,?,?)";
		$this->db->query($sql, $data);			
	}

	public function getPendingOrders() {

		$sql = "SELECT id,customer,pharmacy,content,delivery_type,delivery_time,orderDate,status FROM myrx_orders WHERE status = 'pending' ORDER BY orderDate,id DESC ";
		return $this->db->query($sql);		
	}

	public function getOrderRequest() {

		$sql = "SELECT id,customer,rx,message,details,pharmacy FROM myrx_order_request WHERE status = 'pending' ORDER BY id DESC";
		return $this->db->query($sql);			
	}

	public function getSingleOrderRequest($custId) {

		$id = $this->db->escape_str($custId);

		$sql = "SELECT id,customer,rx,message,details,pharmacy FROM myrx_order_request WHERE id = ".$id;
		return $this->db->query($sql);		
	}

	public function setPharmacy($pharmacyId,$custId) {

		$pharmacy = $this->db->escape_str($pharmacyId);
		$customer = $this->db->escape_str($custId);

		$sql = "UPDATE myrx_order_request SET pharmacy = ".$pharmacy." WHERE id = ".$customer;
		$this->db->query($sql);		
	}

	public function delivered($data) {

		$sql = "UPDATE myrx_order_request SET status = 'delivered' WHERE id = ?";
		$this->db->query($sql,$data);	
	}

	public function delete($data) {
		$sql = "DELETE FROM myrx_order_request WHERE id = ?";
		$this->db->query($sql, $data);			
	}

}