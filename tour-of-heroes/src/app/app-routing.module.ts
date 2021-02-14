//RUTAS

// La mejor manera de trabajar con el router es cargarlo y configurarlo en un archivo aparte
// Para ello ejecutamos este comando "ng generate module app-routing --flat --module=app"

// *
// --flat -------> Establece el archivo en "src/app" en vez de en su propia carpeta
// --module = app ------> Le dice al cli que importe el "AppRoutingModule"


import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
//1. Hay que importa "Routes" y "RoutesModule" de la libreria de angular '@angular/router'
import{RouterModule,Routes} from '@angular/router';
import { CommonModule } from '@angular/common';

// 2. Hay que añadir el componete "HeroesComponent" para tenerlo disponible para la ruta
import { HeroesComponent } from './heroes/heroes.component';

//3. Declaramos la ruta

const routes: Routes = [
  // Ruta base para cuando accedas a la aplicacion te redirija al 'dashboard' como primera pagina
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path:'heroes', component :HeroesComponent},
  {path:'dashboard', component :DashboardComponent},
  {path:'detail/:id', component : HeroDetailComponent}
]

// 4. En esta ultima parte metemos la infomacion de la ruta en el "RouterModule" y todo ello se importar a el AppRoutingModule
// que esta declarado de forma global en "app.modules.ts"

// El @NgModule inicializa el router y se mantiene a la espera de los cambios que puedan ocurrir en el navegador

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
