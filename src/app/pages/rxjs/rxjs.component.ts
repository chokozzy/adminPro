import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styles: []
})
export class RxjsComponent implements OnInit {
	constructor() {
		/*	this.regresaObservable().subscribe(
			(numero) => console.log('Subs ', numero),
			(error) => console.error('Error en el obs ', error),
			() => console.log('El observador Terminó')
		);*/
	}

	ngOnInit() {}
	/*
	regresaObservable(): Observable<any> {
		return new Observable((observer) => {
			let contador = 0;
			const intervalo = setInterval(() => {
				contador += 1;
				const salida = { valor: contador };
				if (contador === 3) {
					clearInterval(intervalo);
					observer.complete();
				}
				observer.next(salida);
			}, 1000);
		}).pipe(
			map((data) => data),
			filter((valor, index) => {
				if (valor % 2 === 1) {
					return true;
				} else {
					return false;
				}
			})
		);
	}*/
}
