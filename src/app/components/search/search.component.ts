import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  loading: boolean;

  artistas: any[] = [];

  constructor(private _spotify: SpotifyService) {}

  buscar(termino: string) {
    console.log(termino);
    this.loading = true;
    this._spotify.getArtistas(termino).subscribe((data: any) => {
      console.log(data); // esto es lo mismo q data.artists.items ya que en los servicios usamos el map para obviar eso
      this.artistas = data; // esto es lo mismo q data.artists.items ya que en los servicios usamos el map para obviar eso;
      this.loading = false;
    });
  }
}
