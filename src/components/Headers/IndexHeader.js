/*!

=========================================================
* Paper Kit React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, {useState} from "react";

// reactstrap components
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// core components
import QrReader from 'react-qr-reader'
import {useHistory} from 'react-router'
function IndexHeader(props) {
  const {
    buttonLabel,
    className
  } = props;

  let history = useHistory()
  let [option, setOption] = useState('')
  const [modal, setModal] = useState(false);
  let handleScan = (data) =>{
    if (data != null) {
      history.push(`/nucleo-icons/${data}`)
    }
  }

  const toggle = () => {
    setModal(!modal)
    setOption('QR')
  }
  return (
    <>
    {/* modal scan  */}
     <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Scan QR</ModalHeader>
        <ModalBody>
        <QrReader
          delay={300}
        
          onScan={handleScan}
          style={{ width: '100%' }}
        />
        </ModalBody>
        <ModalFooter>
        
        </ModalFooter>
      </Modal>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/smk.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Absensi Guru</h1>
             
            </div>
            <h2 className="presentation-subtitle text-center">
            <Button color="danger" onClick={toggle}>Absen</Button>
            </h2>
          </Container>
        </div>
       
    
      </div>
     
    </>
  );
}

export default IndexHeader;
