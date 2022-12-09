import { NgModule } from '@angular/core';
import { Routes,RouterModule} from '@angular/router';

import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const rutas : Routes= [
  {path:'clientes', component: ClientesComponent},
  {path:'cliente/:id', component: ClienteComponent},
  {path:'**',pathMatch:'full',redirectTo:'clientes'}
]


@NgModule({
  imports: [
    RouterModule.forRoot(rutas)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
