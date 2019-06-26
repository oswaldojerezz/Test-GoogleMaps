import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import {MatSnackBar, MatDialog, MatDialogRef} from '@angular/material';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  title = 'My first AGM project';
  lat = 50.912214;
  lng = -113.957276;

  constructor( public snackBar: MatSnackBar, public dialog: MatDialog ) {

  if ( localStorage.getItem('marcadires') ) {
    this.marcadores = JSON.parse(localStorage.getItem('marcadires'));
  }

  }

  ngOnInit() {
  }

  openDialog( marc: Marcador ): void {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marc.titulo, desc: marc.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if ( !result ) {
        return;
      }
      marc.titulo = result.titulo;
      marc.desc = result.desc;
      this.guardarStorage();
      this.snackBar.open('Marcador Editado', 'Undo', { duration: 3000 });
    });
  }

agregarMarcador(evento) {
  const coords: { lat: number, lng: number } = evento.coords;
  const nuevoMarcador = new Marcador(coords.lat , coords.lng);
  this.marcadores.push(nuevoMarcador);
  this.guardarStorage();
  this.snackBar.open('Marcador agregado', 'Undo', { duration: 3000 });
}

borrarMarcador(i) {
  this.marcadores.splice(i, 1);
  this.guardarStorage();
  this.snackBar.open('Marcador borrado', 'Undo',  { duration: 3000 });
}

guardarStorage() {
localStorage.setItem('marcadires', JSON.stringify( this.marcadores ) );

}


}
