import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  environment,
  capasAmenaza,
  capasCobertura,
  capasReferencia,
} from 'src/environments/environment';
import * as WMS from 'leaflet.wms';

@Component({
  selector: 'app-capas',
  templateUrl: './capas.component.html',
  styleUrls: ['./capas.component.css'],
})
export class CapasComponent implements OnInit {
  @Input() map!: any;
  @Output() encender = new EventEmitter();
  @Output() apagar = new EventEmitter();
  @Output() transparencia = new EventEmitter();

  public capas = {
    amenaza: [] as Array<any>,
    referencia: [] as Array<any>,
    coberturas: [] as Array<any>,
  };

  public paneles = {
    nevado: true,
    coberturas: false,
    referencia: false,
  };

  togglePanel(panel: string) {
    switch (panel) {
      case 'nevado':
        this.paneles.nevado = !this.paneles.nevado;
        break;
      case 'coberturas':
        this.paneles.coberturas = !this.paneles.coberturas;
        break;
      case 'referencia':
        this.paneles.referencia = !this.paneles.referencia;
        break;
    }
  }

  toggleLayerProps(c:any) {
    c.propiedades = !c.propiedades;
  }

  ngOnInit() {
    this.capas.amenaza = capasAmenaza;
    this.capas.coberturas = capasCobertura;
    this.capas.referencia = capasReferencia;

    this.capas.amenaza.forEach((c) => {
      const wmsLayer = WMS.source(c.url_servicio, {
        layers: c.nombre_capa_servicio,
        transparent: true,
        opacity: 0.5,
        format: 'image/png',
      });

      const wl = wmsLayer.getLayer(c.nombre_capa);
      c.capa = wl;
      c.estado = true;
      c.propiedades = false;
      this.encender.emit(c);
    });

    this.capas.coberturas.forEach((c) => {
      const wmsLayer = WMS.source(c.url_servicio, {
        layers: c.nombre_capa_servicio,
        transparent: true,
        opacity: 0.5,
        format: 'image/png',
      });

      const wl = wmsLayer.getLayer(c.nombre_capa);
      c.capa = wl;
      c.estado = false;
      c.propiedades = false;
    });

    this.capas.referencia.forEach((c) => {
      const wmsLayer = WMS.source(c.url_servicio, {
        layers: c.nombre_capa_servicio,
        transparent: true,
        opacity: 0.5,
        format: 'image/png',
      });

      const wl = wmsLayer.getLayer(c.nombre_capa);
      c.capa = wl;
      c.estado = false;
      c.propiedades = false;
    });
  }

  cambiarTransparencia(capa: any, valor: any) {
    this.transparencia.emit([capa, valor]);
  }

  cambiarEstado(capa: any) {
    capa.estado = !capa.estado;
    capa.estado ? this.encender.emit(capa) : this.apagar.emit(capa);
  }
}
