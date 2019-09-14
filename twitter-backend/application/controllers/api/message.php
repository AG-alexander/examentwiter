<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

class Message extends REST_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->database();
    }

    public function getMessage_get() {
        $id = $this->uri->segment(4);

        if(!empty($id)){
            $data = $this->db->get_where('tb_mensaje', ['id' => $id])->row_array();
        }else{
            $data = $this->db->get('tb_mensaje')->result();
        }
        if(!$data)
            $data = 'No hay registros con este ID.';
        $this->response($data, REST_Controller::HTTP_OK);
        
    }

    public function postMessage_post() {
        $data = $this->input->post();

        if($this->db->insert('tb_mensaje', $data))
        $this->response('Item creado con éxito.', REST_Controller::HTTP_OK); 
    }

    public function updateMessage_put() {
        $id = $this->put('id');
        $data = $this->put();

        if($this->db->update('tb_mensaje', $data, array('id'=>$id)))
            $this->response('Item actualizado con éxito.', REST_Controller::HTTP_OK);
    }

    public function deleteNews_get() {
            $id = $this->uri->segment(4);

            if($this->db->delete('tb_mensaje', array('id'=>$id)))
                $this->response('Item eliminado con éxito.', REST_Controller::HTTP_OK);
        }
}