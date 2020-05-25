import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router'; // imoort necesario para navegar por las rtuas, se declara en el constrcutro

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css'],
})
export class TarjetasComponent {
  @Input() items: any[] = [];

  constructor(private _router: Router) {}

  verArtista(item: any) {
    // esta funcion se crea ya que al darle clicl en las tarjetas del home me va a llevar al type albums, pero en el search al tipo artist, entonces cada id se busca diferetnte

    let artistaId;

    if (item.type === 'artist') {
      artistaId = item.id;
      console.log(artistaId);
    } else {
      artistaId = item.artists[0].id;
      console.log(artistaId);
    }

    this._router.navigate(['/artist', artistaId]);
  }
}
