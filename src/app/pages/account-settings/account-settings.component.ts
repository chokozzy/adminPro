import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/service.index';
import { url } from 'inspector';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService) {

  }

  cambiarColor(tema: string, elemento: any){
    this.removerCheck();
    this.aplicarCheck(tema);
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(tema: string){
    const selectores: any =  document.getElementsByClassName('selector');
    for ( const ref of selectores){
        if ( ref.getAttribute('data-theme') === tema){
          ref.classList.add(`working`);
          break;
        }
    }
  }
  removerCheck(){
    const selectores: any =  document.getElementsByClassName('selector');
    for ( const ref of selectores){
          ref.classList.remove(`working`);
    }
  }
  ngOnInit() {
    this.aplicarCheck(this._ajustes.ajustes.tema);
  }

}
