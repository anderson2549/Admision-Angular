import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  

  constructor(private httpClient: ClientesService){}
  
  clientes: ClienteModel[]= [];
  cargando = false;


  ngOnInit(): void {
   
    
    this.getClientes();
  }

  getClientes(){
    this.cargando= true;
    this.httpClient.obtenerClientes().subscribe((resp)=>{
      this.clientes = resp;
      this.cargando= false;
    });
  }
  borrarCliente(cliente: ClienteModel){
    
    swal.fire({
      title:"¿Estas seguro?",
      text:`Estas seguro de eliminar a ${cliente.Nombres}?`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then((val)=>{
      this.cargando= true;
      if(val.value){
        this.httpClient.borrarCliente(cliente.CodClient).subscribe(()=>{
          this.getClientes()
        })
      }
    });

    
  }

}
