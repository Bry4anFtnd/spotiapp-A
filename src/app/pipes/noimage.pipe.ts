import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimage',
})
export class NoimagePipe implements PipeTransform {
  transform(images: any[]): string {
    if (!images) {
      // si no hay imagenes comja la q tengo en los assets
      return 'assets/img/noimage.png';
    }

    if (images.length > 0) {
      // si hay una imagen coja la q esta en ese path
      console.log('hola');
      return images[0].url;
    } else {
      // si no coja la q esta en los assets
      return 'assets/img/noimage.png';
    }
  }
}
