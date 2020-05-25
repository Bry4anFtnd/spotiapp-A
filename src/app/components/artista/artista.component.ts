import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // import para q escuche la ruta activa
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [],
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any = {};
  loading: boolean;

  constructor(
    private _router: ActivatedRoute,
    private _spotify: SpotifyService
  ) {
    this.loading = true;
    this._router.params.subscribe((params) => {
      // asi estoy escuchando q parametros tengo en la url
      this.getArtista(params['id']); // si lo dejo solo con (params) me va traer un objeto, pero al ponerle el index id me trae ya el id solo
      this.getTopTracks(params['id']);
      // le asiganmos los parametros de esas funciones cuando escuchemos el params
    });
  }
  // this.getArtista(params['id']) aca llamamos a funcion q esta aca y le asignamos el valor del id, con los params
  // ahora aca abajo llama a esa funcion q esta en los services con el id ya incluido, lo q va a hacer es retornarme la url ya lista como lo esta en el service
  getArtista(id: string) {
    this.loading = true;

    this._spotify.getArtista(id).subscribe((artista) => {
      console.log(artista);
      this.artista = artista;
      this.loading = false;
    });
  }

  getTopTracks(id: string) {
    this._spotify.getTopTracks(id).subscribe((topTracks) => {
      console.log(topTracks);
      this.topTracks = topTracks;
    });
  }
}
