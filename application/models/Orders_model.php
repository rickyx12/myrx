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

}