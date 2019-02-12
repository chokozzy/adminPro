import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_loading()
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './login.component.css' ]
})
export class RegisterComponent implements OnInit {
	forma: FormGroup;

	constructor(public _usuarioService: UsuarioService, public router: Router) {}
	sonIguales(campo1: string, campo2: string) {
		return (group: FormGroup) => {
			const formInput1 = group.controls[campo1].value;
			const formInput2 = group.controls[campo2].value;

			if (formInput1 === formInput2) {
				return null;
			}
			return {
				sonDiferentes: true
			};
		};
	}
	ngOnInit() {
		init_loading();
		this.forma = new FormGroup(
			{
				nombre: new FormControl(null, Validators.required),
				email: new FormControl(null, [ Validators.email, Validators.required ]),
				password: new FormControl(null, Validators.required),
				password2: new FormControl(null, Validators.required),
				condiciones: new FormControl(false)
			},
			{ validators: this.sonIguales('password', 'password2') }
		);
	}
	registrarUsuario() {
		if (this.forma.invalid) {
			return;
		}
		if (!this.forma.value.condiciones) {
			swal('Importante!', 'Debe aceptar las condiciones!', 'warning');
			return;
		}
		const usuario = new Usuario(this.forma.value.nombre, this.forma.value.email, this.forma.value.password);
		this._usuarioService.crearUsuario(usuario).subscribe((resp) => this.router.navigate([ '/login' ]));
	}
}
