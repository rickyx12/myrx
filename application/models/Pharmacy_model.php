<?php

class Pharmacy_model extends CI_Model {

        public function __construct() {
                $this->load->database();
        }


        public function search_pharmacy($location) {
                
                $loc = $this->db->escape_str($location);
                $sql = "SELECT * FROM myrx_pharmacy WHERE active = 1 AND address LIKE '%".$loc."%'";
                
                return $this->db->query($sql);
        }


        public function list_pharma() {

            $sql = "SELECT * FROM myrx_pharmacy WHERE active = 1";
            return $this->db->query($sql);         	
        }

        public function getOrders($pharmacyId) {

            $id = $this->db->escape_str($pharmacyId);

            $sql = "SELECT * FROM myrx_orders WHERE status = 'pending' AND pharmacy = '".$id."' ";
            return $this->db->query($sql);   

        }

}