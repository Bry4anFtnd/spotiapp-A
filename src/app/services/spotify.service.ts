import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // import necesario para trabajar con las peticiones http y con HttpHeaders podemos trabjar con los headers q nos pide por ejemplo las apis

import { map } from 'rxjs/operators'; // importacion necesario para trabajar con el .map
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root', // cuando tenemos esta declaracion no hay necesidad de importar este servicio en el module
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('  service spotify listo');
  }

  getQuery(query: string) {
    // creamos este metodo para dinamiozar los 2 de abajo y no copiar tanto codigo
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      // declaramos una variavle para q se almacene ese header asi
      // segun la api nos pide cierto header, en este caso solo es Authorization con su valor el q esta en comillas q es el token de autorizacion
      Authorization:
        'Bearer BQB-IgqTDDHgO96pAvFTm9uXbNXS-AOMmDVRKZz9YiOIPPAY6h-X9UZrxvDgecxVEHDvPRlXBtbj1Md--l8',
    });

    return this.http.get(url, { headers });
  }
  // El .pipe y el .map su usan para filtrar un arreglo u objeto cuando es muy grande y asi poderlo usar en los componentes solo con la variable en este caso data
  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      // asi me retorna una peticion http this.http.get(url, { headers }); se puso asi para acortar codigo pq el metodo de getArtista es iguak
      map((data: any) => {
        return data.albums.items; // ahora al usar map podemos usar data sin ncesidad de los puntos para acceder a las propiedades
      })
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      // asi me retorna una peticion http this.http.get(url, { headers }); se puso asi para acortar codigo pq el metodo de getArtista es iguak
      map((data: any) => {
        return data.artists.items; // ahora al usar map podemos usar data sin ncesidad de los puntos para acceder a las propiedades
      })
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    // En esta funcion no necesiamos ni pipe ni map pq viene un unico artista osea q no hay q mapear el arreglo pq es solo uno
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data: any) => {
        return data.tracks; // ahora al usar map podemos usar data sin ncesidad de los puntos para acceder a las propiedades
      })
    );
  }
}
