<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Message extends REST_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->database();
    }

    public function authenticationUser() {
        
        $data = $this->input->post();

        if(!$data) {
            $data = "Usuaio o contraseña incorrectos";
        } else {
            $data = $this->db->get_where('tbusuario', ['user' => $data['user'], 'password' => $data['password']])->row_array();
        }
    }
}