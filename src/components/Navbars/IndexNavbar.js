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
import React, {useState, useEffect} from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
import axios from 'axios'
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input
} from "reactstrap";

import Swal from 'sweetalert2'
import { useHistory } from "react-router";

function IndexNavbar(props) {
  let history = useHistory();
  const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);
  let [roomResult , setRoomResult] = useState([])
  let [codeRoom, setCodeRoom] = useState('')

  // use effect
  useEffect(() => {
    getRoom()
  }, [])

  // get room
  let getRoom = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}ApiRoom`
    }).then((response) => {
        setRoomResult(response.data)
    })
  }

  let next = (event) => {
    event.preventDefault()
    if (codeRoom == 'Pilih kelas' || codeRoom == '') {
      Swal.fire(
        'Terjadi kesalahan',
        'Form kelas tidak terisi.',
        'error'
      )
    }else{
      history.push(`/nucleo-icons/${codeRoom}`)
    }
  }
 

  const toggle = () => setModal(!modal);
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
     <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Input Kode Kelas</ModalHeader>
        <ModalBody>
        <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input type="select" onChange={(e) => setCodeRoom(e.target.value)} id="exampleSelect">
        <option>Pilih kelas</option>
        {roomResult.map(data => (
    
        <option>{data.code_room}</option>

          ))}
        </Input>
      </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={next}>Next</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            target="_blank"
            title="Coded by Creative Tim"
          >
            SMK Negeri 2 Trenggalek
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
          
            <NavItem>
           
            </NavItem>
           
           
        
            <NavItem>
              <Button
                className="btn-round"
                color="danger"
            
                target="_blank"
                onClick={toggle}
              >
                Absen Manual
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default IndexNavbar;
