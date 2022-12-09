import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteModel } from '../models/cliente.model';
import { configAPP } from '../configs/constants';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  recurso: string = "Clientes";
  constructor(private http: HttpClient) { }


  crearCliente(cliente: ClienteModel) {
    let action = "Insert";
    return this.http.post(this.getURL(action),cliente,{headers:this.getHeaders()});

  }
  
  actualizarCliente(cliente: ClienteModel) {
    let action = "Update";
    return this.http.put(this.getURL(action),cliente,{headers:this.getHeaders()});

  }

  
  borrarCliente(CodCliente: number) {
    let action = "Delete";
    return this.http.delete(this.getURL(action),{params:{"idCliente":CodCliente},headers:this.getHeaders()});

  }

  
  obtenerCliente(CodCliente: string) {
    let action = "Get";
    return this.http.get(this.getURL(action),{params:{"idCliente":CodCliente},headers:this.getHeaders()});

  }

  
  obtenerClientes() {
    let action = "GetAll";
    return this.http.get(this.getURL(action),{headers:this.getHeaders()})
                    .pipe(
                      map(this.crearArreglo)
                    );

  }

  getHeaders(){
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'accept':'*/*'
    });
  }

  getURL(action:string) {
    return configAPP.URL_API + this.recurso+ "/" + action;
  }

  crearArreglo(clienteObj: any){
    const clienteArr: ClienteModel[]= [];
    console.error(clienteObj)
    if(clienteObj==null){
      return clienteArr;
    }
    Object.keys(clienteObj.Data).forEach(key=>{
      const cliente: ClienteModel= clienteObj.Data[key];
      clienteArr.push(cliente);
    })
    return clienteArr
  }
}
