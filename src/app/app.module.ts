import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HolaComponent } from './hola.component';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login.component';

const routes:Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'greetings', canActivate: [AuthGuard], children: [
    { path: '', component: HelloComponent },
    { path: 'hola', component: HolaComponent } 
  ]},
  { path: '', pathMatch: 'full', redirectTo: 'greetings' },
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, HelloComponent, HolaComponent, LoginComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

