import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
// tslint:disable-next-line:semicolon
declare function init_loading()
declare const gapi: any;
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	email: String;
	auth2: any;
	constructor(public router: Router, public _usuarioService: UsuarioService) {}

	googleInit() {
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: '926159254646-u43g3lacfssvqqm5hjcpovhuo2ltfv5n.apps.googleusercontent.com',
				cookiepolicy: 'single_host_origin',
				scoope: 'profile email'
			});
			this.attachSingin(document.getElementById('btnGoogle'));
		});
	}
	attachSingin(element) {
		this.auth2.attachClickHandler(element, {}, (googleUser) => {
			// const profile = googleUser.getBasicProfile();
			const token = googleUser.getAuthResponse().id_token;
			this._usuarioService.loginGoogle(token).subscribe((resp) => (window.location.href = '#/dashboard'));
		});
	}
	ingresar(forma: NgForm) {
		if (!forma.valid) {
			return;
		} else {
			const usuario = new Usuario(null, forma.value.email, forma.value.password);
			this._usuarioService
				.login(usuario, forma.value.recuerdame)
				.subscribe((resp) => this.router.navigate([ '/dashboard' ]));
		}
	}
	ngOnInit() {
		init_loading();
		this.googleInit();
		this.email = localStorage.getItem('email') || '';
	}
}
