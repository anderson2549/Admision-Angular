import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClienteModel } from 'src/app/models/cliente.model';
import swal from 'sweetalert2';

import { Observable } from 'rxjs';



import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  cliente = new ClienteModel;
  detalle = false;
  constructor(private clientServ: ClientesService,private router:Router,private ruta:ActivatedRoute) {

  }

  ngOnInit() {
    const id = this.ruta.snapshot.paramMap.get('id');
    

    if(id!=='nuevo' && typeof id !== 'undefined'){
      var arr = id?.split('-');
      if(arr?.length ==2){
        this.detalle=true;
        this.getClient(arr[1]);
      }else{
        this.getClient(id);
      }
    }
    
  }
  
  getClient(CodClient:any ){
    
    this.clientServ.obtenerCliente(CodClient).subscribe({
      next: (respuesta)=>{
        console.log(respuesta)
        
        let Data1 = respuesta as any;
        let Data = Data1.Data;
        this.cliente.CodClient=Data.CodClient;
        this.cliente.Cargo=Data.Cargo;
        this.cliente.Nombres=Data.Nombres;
        this.cliente.Usuario=Data.Usuario;
        this.cliente.Correo=Data.Correo;
        this.cliente.Telefono=Data.Telefono;
        this.cliente.CodTipoClienteFK=Data.CodTipoClienteFK;
        return;
      }, error: error => {
        let Data = error as any;
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: Data
        })
        console.error('There was an error!', error.message);
      }
    })
  }


  guardar(form: NgForm) {
    if (form.invalid) {
      console.log("Formulario no valido")
      //return;
    }
    swal.fire({
      title:"Procesando informacion",
      text:'Por favor espere',
      allowOutsideClick:false,
      icon: 'info'
    })

    
    swal.showLoading(null);
    let peticion :Observable<any> ;
    if(this.cliente.CodClient){
      peticion = this.clientServ.actualizarCliente(this.cliente);
    }else{
      peticion = this.clientServ.crearCliente(this.cliente)
    }


    peticion.subscribe({
      next: resp => {
        let Data = resp as any;
        swal.fire(
          'Good job!',
          Data.Message,
          'success'
        ).then(val=>{
          this.router.navigate(['clientes']);
        })
      }, error: error => {
        let Data = error as any;
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: "<ul>"+error.error.replaceAll("\n","<br>")+"</ul>"
        })
      }
    });
    

  }
}
