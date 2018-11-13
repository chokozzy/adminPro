import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input() titulo = 'leyenda';
  @Input() porcentaje = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

 ngOnInit() {
 }

 cambiarValor(valor: number) {
   if (this.porcentaje >= 100 && valor > 0 ) {
     return;
   }
   if (this.porcentaje <= 0 && valor < 0) {
     return;
   }
  this.porcentaje = this.porcentaje + valor;
  this.cambioValor.emit(this.porcentaje);
  this.txtProgress.nativeElement.focus();
 }

 onModelChange( newValue: number){
   if (newValue > 100){
     this.porcentaje = 100;
   }else if ( newValue <= 0){
     this.porcentaje = 0;
   }else{
    this.porcentaje = newValue;
   }
   this.txtProgress.nativeElement.value = this.porcentaje;
   this.cambioValor.emit(this.porcentaje);

 }


}
