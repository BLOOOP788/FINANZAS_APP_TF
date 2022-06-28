import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSortModule}from '@angular/material/sort';
import {MatCardModule}from '@angular/material/card';
import {MatGridListModule} from "@angular/material/grid-list"
import {MatListModule} from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { LoginComponent } from './Usuario/page/login/login.component';
import { RellenodedatosComponent } from './Usuario/page/rellenodedatos/rellenodedatos.component';
import { MuestradedatosComponent } from './Usuario/page/muestradedatos/muestradedatos.component';
import { HistorialComponent } from './Usuario/page/historial/historial.component';
import { RegistroComponent } from './Usuario/page/registro/registro.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RellenodedatosComponent,
    MuestradedatosComponent,
    HistorialComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatOptionModule,
    MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
