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
import { format } from 'date-fns';
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
      let status = parseInt(jam.replace(':',''), 9) > parseInt(format(new Date(), 'kkmm'), 9) ? "Terlambat" : "Tepat Waktu"
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_URL}absencePostApi/${props.match.params.code}/${code}/${kelas}/${jam}/${materi}/${status}`
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
          <option value="07:10">1</option>
          <option value="07:55">2</option>
          <option value="08:40">3</option>
          <option value="09:25">4</option>
          <option value="10:25">5</option>
          <option value="11:10">6</option>
          <option value="12:25">7</option>
          <option value="13:15">8</option>
          <option value="13:55">9</option>
          <option value="14:40">10</option>
          <option value="15:25">11</option>
          <option value="16:10">12</option>
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
