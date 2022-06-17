import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//importancion de componentes para las rutas
import { LoginComponent } from './Usuario/page/login/login.component';
import { RegistroComponent } from './Usuario/page/registro/registro.component';
import { RellenodedatosComponent } from './Usuario/page/rellenodedatos/rellenodedatos.component';
const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'main',component:RellenodedatosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
