<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

 	public function __construct() {
 		parent::__construct();
 		$this->load->helper('url');
 	}

	public function index()
	{

 		$data = array("page" => "dashboard-nav");

		$this->load->view('includes/header',$data);
		$this->load->view('dashboard/index');
		$this->load->view('includes/footer');
	}
}
