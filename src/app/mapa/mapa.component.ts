import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import * as WMS from 'leaflet.wms';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {

  private map;

  public capaSeleccionada = undefined;
  public legend;
  public panelDerecho = 'panel-izquierdo';
  public panelIzquierdo = 'panel-izquierdo';
  public coordenadas = {
    latitud: 0,
    longitud: 0
  };
  public paneles = false;

  public capas = {
    secuestro: [],
    diferenciaAbs: [],
    tasaAbs: [],
    diferenciaRel: [],
    tasaRel: [],
    incertidumbre: []
  };

  private mapaBaseOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  private mapaBaseESRI = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
  });

  private initMap(): void {

    this.map = L.map('map', {
      center: [4, -72],
      zoom: 6
    });

    this.mapaBaseESRI.addTo(this.map);

    this.configurarCapas();

    this.map.on('click', e => {
      this.coordenadas.latitud = e.latlng.lat;
      this.coordenadas.longitud = e.latlng.lng;

      console.log('XY', this.coordenadas);
      console.log('evento', e);
    });

  }

  constructor() { }

  ngAfterViewInit() {
    this.initMap();
  }

  configurarCapas() {
    let sourceABS = WMS.source(environment.servicios + "SERVICE=WMS&", {
      // opacity: 1,
      transparent: true,
      styles: 'FAO-AGROSAVIA:ABS',
      format: 'image/png',
      info_format: 'text/html'
    });

    let sourceASR = WMS.source(environment.servicios + "SERVICE=WMS&", {
      // opacity: 1,
      transparent: true,
      styles: 'FAO-AGROSAVIA:ASR',
      format: 'image/png',
      info_format: 'text/html'
    });

    let sourceFinalSOC = WMS.source(environment.servicios + "SERVICE=WMS&", {
      // opacity: 1,
      transparent: true,
      styles: 'FAO-AGROSAVIA:FINALSOC',
      format: 'image/png',
      info_format: 'text/html'
    });

    let sourceRelDiff = WMS.source(environment.servicios + "SERVICE=WMS&", {
      // opacity: 1,
      transparent: true,
      styles: 'FAO-AGROSAVIA:RELDIFF',
      format: 'image/png',
      info_format: 'text/html'
    });

    let sourceRSR = WMS.source(environment.servicios + "SERVICE=WMS&", {
      // opacity: 1,
      transparent: true,
      styles: 'FAO-AGROSAVIA:RSR',
      format: 'image/png',
      info_format: 'text/html'
    });

    let sourceUncertainty = WMS.source(environment.servicios + "SERVICE=WMS&", {
      // opacity: 1,
      transparent: true,
      styles: 'FAO-AGROSAVIA:UNCERTAINTY',
      format: 'image/png',
      info_format: 'text/html'
    });

    let urlImagen = 'service=WMS&version=1.1.0&request=GetMap&bbox=-267748.125689679%2C-475530.32789953006%2C1413251.874310321%2C1780469.67210047&width=572&height=768&srs=EPSG%3A32618&styles=&format=image%2Fpng&layers=';

    // SECUESTRO
    this.capas.secuestro.push({
      nombre: 'SECUESTRO DE CARBONO 2020  t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_T0_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_T0_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceFinalSOC.getLayer("FAO-AGROSAVIA:COL_GSOCseq_T0_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_T0_Map030&style=FAO-AGROSAVIA:FINALSOC',
      stats: {
        STATISTICS_MAXIMUM: 280.56689453125,
        STATISTICS_MEAN: 48.557019621794,
        STATISTICS_MINIMUM: 8.5677919387817,
        STATISTICS_STDDEV: 27.706235496363
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_T0_Map030.png'
    });

    this.capas.secuestro.push({
      nombre: 'SECUESTRO DE CARBONO 2040 BAJO EL USO ACTUAL BAU t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_finalSOC_BAU_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_finalSOC_BAU_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceFinalSOC.getLayer("FAO-AGROSAVIA:COL_GSOCseq_finalSOC_BAU_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_finalSOC_BAU_Map030&style=FAO-AGROSAVIA:FINALSOC',
      stats: {
        STATISTICS_MAXIMUM: 283.61129760742,
        STATISTICS_MEAN: 48.12054525942,
        STATISTICS_MINIMUM: 6.7401142120361,
        STATISTICS_STDDEV: 27.275065267308
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_finalSOC_BAU_Map030.png'
    });

    this.capas.secuestro.push({
      nombre: 'SECUESTRO DE CARBONO 2040  ESCENARIO BAJO (5%) t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_finalSOC_SSM1_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_finalSOC_SSM1_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceFinalSOC.getLayer("FAO-AGROSAVIA:COL_GSOCseq_finalSOC_SSM1_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_finalSOC_SSM1_Map030&style=FAO-AGROSAVIA:FINALSOC',
      stats: {
        STATISTICS_MAXIMUM: 289.21353149414,
        STATISTICS_MEAN: 49.3568776022,
        STATISTICS_MINIMUM: 6.8473515510559,
        STATISTICS_STDDEV: 27.792061101586
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_finalSOC_SSM1_Map030.png'
    });

    this.capas.secuestro.push({
      nombre: 'SECUESTRO DE CARBONO  2040  ESCENARIO MEDIO (10%) t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_finalSOC_SSM2_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_finalSOC_SSM2_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceFinalSOC.getLayer("FAO-AGROSAVIA:COL_GSOCseq_finalSOC_SSM2_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_finalSOC_SSM2_Map030&style=FAO-AGROSAVIA:FINALSOC',
      stats: {
        STATISTICS_MAXIMUM: 294.81594848633,
        STATISTICS_MEAN: 50.593210034579,
        STATISTICS_MINIMUM: 6.9546141624451,
        STATISTICS_STDDEV: 28.31063860086
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_finalSOC_SSM2_Map030.png'
    });

    this.capas.secuestro.push({
      nombre: 'SECUESTRO DE CARBONO  2040  ESCENARIO ALTO (20%) t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_finalSOC_SSM3_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_finalSOC_SSM3_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceFinalSOC.getLayer("FAO-AGROSAVIA:COL_GSOCseq_finalSOC_SSM3_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_finalSOC_SSM3_Map030&style=FAO-AGROSAVIA:FINALSOC',
      stats: {
        STATISTICS_MAXIMUM: 291.65463256836,
        STATISTICS_MEAN: 53.063938764355,
        STATISTICS_MINIMUM: 0,
        STATISTICS_STDDEV: 29.345705788815
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_finalSOC_SSM3_Map030.png'
    });

    // DIFERENCIAS ABSOLUTAS
    this.capas.diferenciaAbs.push({
      nombre: 'Diferencia absoluta de secuestro (COS USO ACTUAL BAU - COS 2020) t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_AbsDiff_BAU_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_BAU_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceABS.getLayer("FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_BAU_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_BAU_Map030&style=FAO-AGROSAVIA:ABS',
      stats: {
        STATISTICS_MAXIMUM: 22.533206939697,
        STATISTICS_MEAN: -0.43647436412964,
        STATISTICS_MINIMUM: -17.415224075317,
        STATISTICS_STDDEV: 1.276544530442,
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_AbsDiff_BAU_Map030.png'
    });

    this.capas.diferenciaAbs.push({
      nombre: 'Diferencia absoluta de secuestro (COS ESCENARIO BAJO (5%) - COS 2020)  t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_AbsDiff_SSM1_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_SSM1_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceABS.getLayer("FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_SSM1_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_SSM1_Map030&style=FAO-AGROSAVIA:ABS',
      stats: {
        STATISTICS_MAXIMUM: 25.96760559082,
        STATISTICS_MEAN: 0.79985798430291,
        STATISTICS_MINIMUM: -16.432662963867,
        STATISTICS_STDDEV: 1.3118440079211
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_AbsDiff_SSM1_Map030.png'
    });

    this.capas.diferenciaAbs.push({
      nombre: 'Diferencia absoluta de secuestro (COS ESCENARIO MEDIO (10%) - COS 2020) t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_AbsDiff_SSM2_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_SSM2_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceABS.getLayer("FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_SSM2_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_SSM2_Map030&style=FAO-AGROSAVIA:ABS',
      stats: {
        STATISTICS_MAXIMUM: 29.402004241943,
        STATISTICS_MEAN: 2.0361904153292,
        STATISTICS_MINIMUM: -15.450060844421,
        STATISTICS_STDDEV: 1.5609054345401
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_AbsDiff_SSM2_Map030.png'
    });

    this.capas.diferenciaAbs.push({
      nombre: 'Diferencia absoluta de secuestro (COS ESCENARIO ALTO (20%) - COS 2020) t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_AbsDiff_SSM3_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_SSM3_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceABS.getLayer("FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_SSM3_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_AbsDiff_SSM3_Map030&style=FAO-AGROSAVIA:ABS',
      stats: {
        STATISTICS_MAXIMUM: 36.270801544189,
        STATISTICS_MEAN: 4.5087234949194,
        STATISTICS_MINIMUM: -13.484773635864,
        STATISTICS_STDDEV: 2.3952230653924
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_AbsDiff_SSM3_Map030.png'
    });

    // TASAS ABSOLUTAS
    this.capas.tasaAbs.push({
      nombre: 'Tasa absoluta de secuestro (COS USO ACTUAL BAU - COS 2020 /20 AÑOS) t.ha-1. año -1',
      nombre_capa: 'COL_GSOCseq_ASR_BAU_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_ASR_BAU_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceASR.getLayer("FAO-AGROSAVIA:COL_GSOCseq_ASR_BAU_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_ASR_BAU_Map030&style=FAO-AGROSAVIA:ASR',
      stats: {
        STATISTICS_MAXIMUM: 1.1266603469849,
        STATISTICS_MEAN: -0.021823718214039,
        STATISTICS_MINIMUM: -0.87076115608215,
        STATISTICS_STDDEV: 0.063827226548689
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_ASR_BAU_Map030.png'
    });

    this.capas.tasaAbs.push({
      nombre: 'Tasa absoluta de secuestro (COS ESCENARIO BAJO (5%) - COS 2020 /20 AÑOS) t.ha-1. año -1',
      nombre_capa: 'COL_GSOCseq_ASR_SSM1_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM1_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceASR.getLayer("FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM1_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM1_Map030&style=FAO-AGROSAVIA:ASR',
      stats: {
        STATISTICS_MAXIMUM: 1.2983802556992,
        STATISTICS_MEAN: 0.039992899217382,
        STATISTICS_MINIMUM: -0.82163310050964,
        STATISTICS_STDDEV: 0.065592200407531
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_ASR_SSM1_Map030.png'
    });

    this.capas.tasaAbs.push({
      nombre: 'Tasa absoluta de secuestro (COS ESCENARIO MEDIO (10%) - COS 2020 /20 AÑOS) t.ha-1. año -1',
      nombre_capa: 'COL_GSOCseq_ASR_SSM2_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM2_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceASR.getLayer("FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM2_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM2_Map030&style=FAO-AGROSAVIA:ASR',
      stats: {
        STATISTICS_MAXIMUM: 1.4701002836227,
        STATISTICS_MEAN: 0.1018095207647,
        STATISTICS_MINIMUM: -0.77250307798386,
        STATISTICS_STDDEV: 0.078045271693281
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_ASR_SSM2_Map030.png'
    });

    this.capas.tasaAbs.push({
      nombre: 'Tasa absoluta de secuestro (COS ESCENARIO ALTO (20%) - COS 2020 /20 AÑOS) t.ha-1. año -1',
      nombre_capa: 'COL_GSOCseq_ASR_SSM3_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM3_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceASR.getLayer("FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM3_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM3_Map030&style=FAO-AGROSAVIA:ASR',
      stats: {
        STATISTICS_MAXIMUM: 1.8135401010513,
        STATISTICS_MEAN: 0.22543617471622,
        STATISTICS_MINIMUM: -0.67423868179321,
        STATISTICS_STDDEV: 0.11976115329234
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_ASR_SSM3_Map030.png'
    });

    // DIFERENCIA RELATIVA
    this.capas.diferenciaRel.push({
      nombre: 'Diferencia relativa de secuestro (COS ESCENARIO BAJO (5%) - COS USO ACTUAL BAU) t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_RelDiff_SSM1_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_RelDiff_SSM1_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceRelDiff.getLayer("FAO-AGROSAVIA:COL_GSOCseq_RelDiff_SSM1_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_RelDiff_SSM1_Map030&style=FAO-AGROSAVIA:RELDIFF',
      stats: {
        STATISTICS_MAXIMUM: 6.3511204719543,
        STATISTICS_MEAN: 1.2363323484486,
        STATISTICS_MINIMUM: 0.10723733901978,
        STATISTICS_STDDEV: 0.5586241700389
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_RelDiff_SSM1_Map030.png'
    });

    this.capas.diferenciaRel.push({
      nombre: 'Diferencia relativa de secuestro ( COS ESCENARIO MEDIO (10%) - COS USO ACTUAL BAU) t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_RelDiff_SSM2_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_RelDiff_SSM2_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceRelDiff.getLayer("FAO-AGROSAVIA:COL_GSOCseq_RelDiff_SSM2_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_RelDiff_SSM2_Map030&style=FAO-AGROSAVIA:RELDIFF',
      stats: {
        STATISTICS_MAXIMUM: 12.702178955078,
        STATISTICS_MEAN: 2.4726647794986,
        STATISTICS_MINIMUM: 0.21449995040894,
        STATISTICS_STDDEV: 1.1172484304047
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_RelDiff_SSM2_Map030.png'
    });

    this.capas.diferenciaRel.push({
      nombre: 'Diferencia relativa de secuestro (COS ESCENARIO ALTO (20%) - COS USO ACTUAL BAU) t.ha-1 ',
      nombre_capa: 'COL_GSOCseq_RelDiff_SSM3_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_RelDiff_SSM3_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceRelDiff.getLayer("FAO-AGROSAVIA:COL_GSOCseq_RelDiff_SSM3_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_RelDiff_SSM3_Map030&style=FAO-AGROSAVIA:RELDIFF',
      stats: {
        STATISTICS_MAXIMUM: 25.404413223267,
        STATISTICS_MEAN: 4.9452237919115,
        STATISTICS_MINIMUM: 0.42895594239235,
        STATISTICS_STDDEV: 2.2341107144033
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_RelDiff_SSM3_Map030.png'
    });

    // TASA RELATIVA
    this.capas.tasaRel.push({
      nombre: 'Tasa relativa de secuestro (COS ESCENARIO BAJO (5%) - COS USO ACTUAL BAU /20 AÑOS) t.ha-1.año-1',
      nombre_capa: 'COL_GSOCseq_RSR_SSM1_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM1_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceRSR.getLayer("FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM1_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM1_Map030&style=FAO-AGROSAVIA:RSR',
      stats: {
        STATISTICS_MAXIMUM: 0.31755602359772,
        STATISTICS_MEAN: 0.061816617423922,
        STATISTICS_MINIMUM: 0.005361866671592,
        STATISTICS_STDDEV: 0.027931208508446
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_RSR_SSM1_Map030.png'
    });

    this.capas.tasaRel.push({
      nombre: 'Tasa relativa de secuestro (COS ESCENARIO MEDIO (10%) - COS USO ACTUAL BAU /20 AÑOS) t.ha-1.año-1',
      nombre_capa: 'COL_GSOCseq_RSR_SSM2_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM2_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceRSR.getLayer("FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM2_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM2_Map030&style=FAO-AGROSAVIA:RSR',
      stats: {
        STATISTICS_MAXIMUM: 0.63510894775391,
        STATISTICS_MEAN: 0.12363323897858,
        STATISTICS_MINIMUM: 0.010724997147918,
        STATISTICS_STDDEV: 0.055862421517239
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_RSR_SSM2_Map030.png'
    });

    this.capas.tasaRel.push({
      nombre: 'Tasa relativa de secuestro (COS ESCENARIO ALTO (20%) - COS USO ACTUAL BAU /20 AÑOS) t.ha-1.año-1',
      nombre_capa: 'COL_GSOCseq_RSR_SSM3_Map030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM3_Map030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceRSR.getLayer("FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM3_Map030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM3_Map030&style=FAO-AGROSAVIA:RSR',
      stats: {
        STATISTICS_MAXIMUM: 1.2702206373215,
        STATISTICS_MEAN: 0.24726118959859,
        STATISTICS_MINIMUM: 0.021447796374559,
        STATISTICS_STDDEV: 0.11170553572235
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_RSR_SSM3_Map030.png'
    });

    // INCERTIDUMBRES

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre SECUESTRO DE CARBONO  2020 (%)',
      nombre_capa: 'COL_GSOCseq_T0_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_T0_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_T0_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_T0_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 23.958948135376,
        STATISTICS_MEAN: 21.794893272185,
        STATISTICS_MINIMUM: 17.722410202026,
        STATISTICS_STDDEV: 0.82098153740488
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_T0_UncertaintyMap030.png'
    });

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre SECUESTRO DE CARBONO  2040 BAJO EL USO ACTUAL (%)',
      nombre_capa: 'COL_GSOCseq_BAU_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_BAU_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_BAU_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_BAU_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 25.588272094727,
        STATISTICS_MEAN: 22.315426311741,
        STATISTICS_MINIMUM: 9.5884132385254,
        STATISTICS_STDDEV: 1.1424492188966
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_BAU_UncertaintyMap030.png'
    });

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre tasa absoluta de secuestro (COS USO ACTUAL BAU - COS 2020 /20 AÑOS) (%)',
      nombre_capa: 'COL_GSOCseq_ASR_BAU_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_ASR_BAU_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_ASR_BAU_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_ASR_BAU_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 17.474170684814,
        STATISTICS_MEAN: 15.597803515394,
        STATISTICS_MINIMUM: 10.697417259216,
        STATISTICS_STDDEV: 0.66346817245438
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_ASR_BAU_UncertaintyMap030.png'
    });

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre tasa absoluta de secuestro (COS ESCENARIO BAJO (5%)  - COS 2020 /20 AÑOS) (%)',
      nombre_capa: 'COL_GSOCseq_ASR_SSM1_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM1_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM1_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM1_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 21.468536376953,
        STATISTICS_MEAN: 18.641607643028,
        STATISTICS_MINIMUM: 9.3362169265747,
        STATISTICS_STDDEV: 1.070660334899,
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_ASR_SSM1_UncertaintyMap030.png'
    });

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre tasa absoluta de secuestro (COS ESCENARIO MEDIO (10%) - COS 2020 /20 AÑOS) (%)',
      nombre_capa: 'COL_GSOCseq_ASR_SSM2_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM2_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM2_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM2_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 21.6083984375,
        STATISTICS_MEAN: 18.721386723157,
        STATISTICS_MINIMUM: 9.2501792907715,
        STATISTICS_STDDEV: 1.0899969757717
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_ASR_SSM2_UncertaintyMap030.png'
    });

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre tasa absoluta de secuestro (COS ESCENARIO ALTO (20%) - COS 2020 /20 AÑOS) (%)',
      nombre_capa: 'COL_GSOCseq_ASR_SSM3_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM3_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM3_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_ASR_SSM3_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 21.887687683105,
        STATISTICS_MEAN: 18.882542681331,
        STATISTICS_MINIMUM: 9.0827865600586,
        STATISTICS_STDDEV: 1.128369895757
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_ASR_SSM3_UncertaintyMap030.png'
    });

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre SECUESTRO DE CARBONO_PRACTICAS DE MANEJO SOSTENIBLE_SSM (%)',
      nombre_capa: 'COL_GSOCseq_SSM_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_SSM_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_SSM_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_SSM_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 35.476509094238,
        STATISTICS_MEAN: 30.088646221614,
        STATISTICS_MINIMUM: 0,
        STATISTICS_STDDEV: 2.0805918970345
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_SSM_UncertaintyMap030.png'
    });

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre Tasa relativa de secuestro (COS ESCENARIO BAJO (5%) - COS USO ACTUAL BAU /20 AÑOS) (%)',
      nombre_capa: 'COL_GSOCseq_RSR_SSM1_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM1_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM1_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM1_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 21.991107940674,
        STATISTICS_MEAN: 18.808167807842,
        STATISTICS_MINIMUM: 8.3398303985596,
        STATISTICS_STDDEV: 1.1561245157197
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_RSR_SSM1_UncertaintyMap030.png'
    });

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre asa relativa de secuestro (COS ESCENARIO MEDIO (10%) - COS USO ACTUAL BAU /20 AÑOS) (%)',
      nombre_capa: 'COL_GSOCseq_RSR_SSM2_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM2_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM2_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM2_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 22.112632751465,
        STATISTICS_MEAN: 18.884031680056,
        STATISTICS_MINIMUM: 8.3575410842896,
        STATISTICS_STDDEV: 1.1717346195478
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_RSR_SSM2_UncertaintyMap030.png'
    });

    this.capas.incertidumbre.push({
      nombre: 'Incertidumbre tasa relativa de secuestro (COS ESCENARIO ALTO (20%) - COS USO ACTUAL BAU /20 AÑOS) (%)',
      nombre_capa: 'COL_GSOCseq_RSR_SSM3_UncertaintyMap030',
      getMap: environment.servicios + urlImagen + 'FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM3_UncertaintyMap030',
      getCapabilities: environment.servicios + 'REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS',
      wmsBaseUrl: environment.servicios,
      estado: false,
      objeto: sourceUncertainty.getLayer("FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM3_UncertaintyMap030"),
      legend: environment.servicios + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=FAO-AGROSAVIA:COL_GSOCseq_RSR_SSM3_UncertaintyMap030&style=FAO-AGROSAVIA:UNCERTAINTY',
      stats: {
        STATISTICS_MAXIMUM: 22.358041763306,
        STATISTICS_MEAN: 19.037842316141,
        STATISTICS_MINIMUM: 8.3931560516357,
        STATISTICS_STDDEV: 1.2031212230066
      },
      histo: 'assets/images/HISTO/COL_GSOCseq_RSR_SSM3_UncertaintyMap030.png'
    });

  }

  cambiarEstado(capa) {

    if (this.capaSeleccionada === undefined) {
      capa.estado = true;
      this.capaSeleccionada = capa;
      this.capaSeleccionada.objeto.addTo(this.map);
    } else {
      this.capaSeleccionada.estado = false;
      this.capaSeleccionada.objeto.remove();
      capa.estado = true;
      this.capaSeleccionada = capa;
      this.capaSeleccionada.objeto.addTo(this.map);
    }
  }

  controlMenu(valor) {
    this.paneles = valor;
  }

}
