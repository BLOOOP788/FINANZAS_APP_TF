import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators,FormControl } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { MatSnackBar} from '@angular/material/snack-bar';
import { User } from '../../model/user';
import { Cartera } from '../../model/cartera';
import { DatosmainService } from '../../service/datosmain.service';

//ejemplo para la tabla
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-rellenodedatos',
  templateUrl: './rellenodedatos.component.html',
  styleUrls: ['./rellenodedatos.component.css']
})

export class RellenodedatosComponent implements OnInit {
  //userData:User;
  carteraData:Cartera;
  
  createData: FormGroup=this.formBuilder.group({
    valorNominal:['',{validators:[Validators.required],updateOn:'change'}],
    tasaCupon:['',{validators:[Validators.required],updateOn:'change'}],
    vencimiento:['',{validators:[Validators.required],updateOn:'change'}],
    tasaNegociacion:['',{validators:[Validators.required],updateOn:'change'}],
    
  });
  submitted:boolean=false;
  selectedPeriodo = 0;
  actions = [
  { id: 0, name: 'Select Country' },
  { id: 1, name: 'Anual' },
  { id: 2, name: 'Semestral' },
  { id: 3, name: 'Trimestral' },
  { id: 4, name: 'Bimestral' },
  { id: 5, name: 'Mensual' },
  { id: 6, name: 'Diaria' }]
  selectedMetodo = 0;
  metodo = [
  { id: 0, name: 'Select Metodo' },
  { id: 1, name: 'Aleman' },
  { id: 2, name: 'Frances' },
  { id: 3, name: 'Americano' }]
  selectedMoneda = 0;
  moneda = [
  { id: 0, name: 'Select Moneda' },
  { id: 1, name: 'Soles' },
  { id: 2, name: 'Dolares' },
  { id: 3, name: 'Euros' }]

  //ejemplo de ocmo deberia de ser la tabla de pagos 
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  dataSource = ELEMENT_DATA; 

  
  constructor(private formBuilder:FormBuilder, private carteraService:DatosmainService) {
    //this.userData=JSON.parse(localStorage.getItem('user'))
    this.carteraData={}as Cartera;
    
  }
  
  ngOnInit(): void {
    this.setTazaCuponValidation();
    this.setValorNominalValidation();
    this.setTazaNegociocionValidation();
    this.setVencimientoValidation();
  }
  get valorNominal(){return this.createData.get('valorNominal');}
  get starting_point(){return this.createData.get('tasaCupon');}
  get departure_date(){return this.createData.get('vencimiento');}
  get cost(){return this.createData.get('tasaNegociacion');}
  setValorNominalValidation(){
    const nameControl=this.createData.get('valorNominal');
    nameControl?.setValidators([Validators.pattern('^[0-9]*$'),Validators.required, Validators.maxLength(30)])
  }
  setTazaCuponValidation(){
    const nameControl=this.createData.get('tasaCupon');
    nameControl?.setValidators([Validators.pattern('^[0-9]*$'),Validators.required, Validators.maxLength(3)])
  }
  setVencimientoValidation(){
    const nameControl=this.createData.get('vencimiento');
    nameControl?.setValidators([Validators.pattern('^[0-9]*$'),Validators.required, Validators.maxLength(3)])
  }
  setTazaNegociocionValidation(){
    const nameControl=this.createData.get('tasaNegociacion');
    nameControl?.setValidators([Validators.pattern('^[0-9]*$'),Validators.required, Validators.maxLength(3)])
  }
  submitForm(){
    console.log()
    this.submitted=true;
  }
  postUser(){
  
  }
}
