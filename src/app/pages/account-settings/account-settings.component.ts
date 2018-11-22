import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document) {

  }

  cambiarColor(tema: String, elemento: any){
    console.log(elemento);
    this._document.getElementById('tema').setAttribute('href', `/assets/css/colors/${tema}.css`);
    this.aplicarCheck(elemento);
  }

  aplicarCheck(link: any){
    const selector: any =  document.getElementsByClassName('working');
    console.log(selector);
    //link.classList.add('working');


  }
  ngOnInit() {
  }

}
