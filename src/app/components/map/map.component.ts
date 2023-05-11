import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import * as WMS from 'leaflet.wms';
import 'leaflet-sidebar-v2';
import 'leaflet-mouse-position';
import { HttpClient } from '@angular/common/http';
// import * as departamentosPoly from '/assets/departamentos.geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  public map!: Map;

  public panelVisible = '';

  public coordenadas = {
    longitud: 0,
    latitud: 0,
  };

  private southWest = L.latLng(-5, -85);
  private northEast = L.latLng(14, -65);
  private bounds = L.latLngBounds(this.southWest, this.northEast);

  private polySeleccion:any;

  constructor(private http: HttpClient) {}

  public options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 27,
        minZoom: 8,
        attribution: '...',
      }),
    ],
    zoom: 10,
    maxZoom: 27,
    minZoom: 8,
    maxBounds: this.bounds,
    center: L.latLng(4.98151, -75.30029),
  };

  onMapReady(map: Map) {
    this.map = map;

    this.map.on('click', (e) => {
      this.coordenadas.latitud = e.latlng.lat;
      this.coordenadas.longitud = e.latlng.lng;
    });

    const mousePosition = L.control.mousePosition();
    mousePosition.addTo(this.map);

    this.panelVisible = 'capas';
  }

  ngAfterViewInit() {
    // this.initMap();
  }

  clickMenu(evento: any) {
    console.log(evento);
    this.panelVisible = evento;
  }

  encenderCapa(evento: any) {
    evento.capa.addTo(this.map);
  }

  apagarCapa(evento: any) {
    evento.capa.remove();
  }

  transparenciaCapa(evento: any) {
    evento[0].setOpacity(evento[1].target.value/100);
  }

  filtroDepartamento(evento:any) {
    fetch('/assets/departamentos.geojson').then(res => res.json())
    .then(dep => {
      if(this.polySeleccion) {
        this.polySeleccion.remove();
      }
      this.polySeleccion = L.geoJSON(dep.features.filter((f:any)=>f.properties.dpto == evento));
      this.polySeleccion.addTo(this.map);
      this.map.fitBounds(this.polySeleccion.getBounds());
    });
  }

  filtroMunicipio(evento:any) {
    fetch('/assets/municipios.geojson').then(res => res.json())
    .then(dep => {
      if(this.polySeleccion) {
        this.polySeleccion.remove();
      }
      this.polySeleccion = L.geoJSON(dep.features.filter((f:any)=>f.properties.mpios == evento));
      this.polySeleccion.addTo(this.map);
      this.map.fitBounds(this.polySeleccion.getBounds());
    });
  }
}
