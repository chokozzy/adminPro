import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	usuario: Usuario;
	token: String;
	constructor(public http: HttpClient, public router: Router) {
		console.log('Servicio de usuario Listo!');
		this.cargarStorage();
	}

	guardarStorage(id: string, token: string, usuario: Usuario) {
		localStorage.setItem('id', id);
		localStorage.setItem('token', token);
		localStorage.setItem('usuario', JSON.stringify(usuario));
		this.usuario = usuario;
		this.token = token;
	}

	loginGoogle(token: String) {
		const url = URL_SERVICIOS + '/login/google';
		return this.http.post(url, { token }).pipe(
			map((resp: any) => {
				this.guardarStorage(resp.id, resp.token, resp.usuario);
				return true;
			})
		);
	}
	logout() {
		this.usuario = null;
		this.token = '';
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');
		this.router.navigate([ '/login' ]);
	}
	login(usuario: Usuario, recordar: boolean) {
		if (recordar) {
			localStorage.setItem('email', usuario.email);
		} else {
			localStorage.removeItem('email');
		}
		const url = URL_SERVICIOS + '/login';
		return this.http.post(url, usuario).pipe(
			map((resp: any) => {
				this.guardarStorage(resp.id, resp.token, resp.usuario);
				return true;
			})
		);
	}
	crearUsuario(usuario: Usuario) {
		const url = URL_SERVICIOS + '/usuario';
		return this.http.post(url, usuario).pipe(
			map((resp: any) => {
				swal('Usuario creado', usuario.email, 'success');
				return resp.usuario;
			})
		);
	}
	usuarioLogueado() {
		return this.token.length > 5 ? true : false;
	}
	cargarStorage() {
		if (localStorage.getItem('token')) {
			this.token = localStorage.getItem('token');
			this.usuario = JSON.parse(localStorage.getItem('usuario'));
		} else {
			this.token = '';
			this.usuario = null;
		}
	}
}
