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
import axios from "axios";
import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input, Row} from 'reactstrap';
import Swal from 'sweetalert2'
import {useHistory} from 'react-router'
function NucleoIcons(props) {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("demo-icons");
    return function cleanup() {
      document.body.classList.remove("demo-icons");
    };
  });


  React.useEffect(() => {
    console.log(props)
  }, [])

   

  // state
  let history = useHistory()
  let [code,  setCode] = useState('')
  let [kelas, setKelas] = useState('')
  let [jam, setJam] = useState('')
  let [materi, setMateri] = useState('')

  let absence = () => {
    if (code == "" || kelas == "" || jam == "" || materi == "") {
      Swal.fire(
        'Terjadi kesalahan',
        'Form tidak boleh kosong',
        'error'
      )
    } else {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_URL}absencePostApi/${props.match.params.code}/${code}/${kelas}/${jam}/${materi}`
      }).then(()=> {
        Swal.fire({
          title: 'Success',
          text: 'Absen berhasil',
          icon: 'success',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.value) {
           history.push('/index')
          }
        })
      })
    }

  }
 
  return (
    <>
      <header>
        <h1>Absen Guru</h1>

      </header>
      <div id="icons-wrapper">
        <section>
        <Form>
      <FormGroup>
        <Label for="exampleEmail">Kode Guru</Label>
        <Input value={code} onChange={(e) => setCode(e.target.value)} type="text" name="email" id="exampleEmail" placeholder="Kode guru" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Kelas</Label>
        <Input value={kelas} onChange={(e) => setKelas(e.target.value)} type="text" name="password" id="examplePassword" placeholder="Kelas" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Jam Ke</Label>
        <Input value={jam} onChange={(e) => setJam(e.target.value)} type="select" name="select" id="exampleSelect">
          <option>Pilih jam</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Materi</Label>
        <Input value={materi} onChange={(e) => setMateri(e.target.value)} type="text" name="password" id="examplePassword" placeholder="Materi" />
      </FormGroup>
     
     <Row>
        <Button onClick={() => history.push('/index')}>Back</Button>
        <Button onClick={absence} style={{marginLeft: 13}}>Klick untuk absen</Button>
      </Row>
    </Form>
        </section>
      </div>
    </>
  );
}

export default NucleoIcons;
