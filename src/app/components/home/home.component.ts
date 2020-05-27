import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  loading: boolean;

  nuevasCanciones: any[] = [];

  // private http: HttpClient con esto tengo disposicion para interactuar con los objetos de las peticiones
  constructor(private _spotify: SpotifyService) {
    // asi podemos usar la info de los services, la metemos en el constructor y le pondemos un alias
    this.loading = true; // cuando se inicie el componente me muestre el spining
    // declaramos una variable q es la q va a poder acceder a ese servicio, en este caso _spotify y accedemos al metodo
    this._spotify.getNewReleases().subscribe((data: any) => {
      // asi escuchamos cada vez q el servicio haga la peticion para q podamos interactuar con ese arreglo
      console.log(data); // esto es lo mismo q data.albums.items ya que en los servicios usamos el map para obviar eso;
      this.nuevasCanciones = data; // esto es lo mismo q data.albums.items ya que en los servicios usamos el map para obviar eso;
      // el .suscribe lo teniamos anteriormente el los services pero como desde aya retoranmos esa peticion get y desde aca la llamamos podemos acceder al suscribe desde acad
      this.loading = false; // cuando se muestren los datos me cierra el loading
    });
  }
}
