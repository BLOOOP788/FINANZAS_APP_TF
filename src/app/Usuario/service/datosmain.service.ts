import { Injectable } from '@angular/core';
import{HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http'
import { Observable,throwError } from 'rxjs';
import { User } from '../model/user';
import { Cartera } from '../model/cartera';
import	{catchError,retry}from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class DatosmainService {
  basePath='https://finanzastfback.herokuapp.com/api/v1/user'

  httpOptions={
       
    headers:new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    })

  }
  constructor(private http:HttpClient) { }
  //API Error Handling
  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`)
    } else {
      // Unsuccessful response error code returned from backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError('Something happened with request, please try again later');
  }
   //Create Event
   create(item: any,id:any){
    return this.http.post<Cartera>(`${this.basePath}/${id}/historial`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Get event by id
  getById(id: any,id2:any){
    return this.http.get<Cartera>(`${this.basePath}/${id}/historial/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Get All-historial
  getAll(id:any){
    return this.http.get<Cartera>(`${this.basePath}/${id}/historial`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Update
  update(id1:any,id2:any, item: any){
    return this.http.put<Cartera>(`${this.basePath}/${id1}/historial/${id2}`, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }

  //Delete 
  delete(id1:any,id2:any){
    return this.http.delete(`${this.basePath}/${id1}/historial/${id2}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));
  }
}
