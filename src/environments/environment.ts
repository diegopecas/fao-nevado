// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviciosNevado: 'http://190.144.114.51:84/geoserver/fao/wms?'
};

export const capasAmenaza = [
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 1,
    nombre: "Cráter (SGC)",
    nombre_capa: "crater",
    nombre_capa_servicio: "fao:crater",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:crater",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:crater"
  },
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 2,
    nombre: "Corrientes Densidad Piroclástica (SGC)",
    nombre_capa: "corrientes_densidad_piroclastica",
    nombre_capa_servicio: "fao:corrientes_densidad_piroclastica",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:corrientes_densidad_piroclastica",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:corrientes_densidad_piroclastica"
  },
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 3,
    nombre: "Caida Ceniza Y Lapilli (SGC)",
    nombre_capa: "caida_ceniza_y_lapilli",
    nombre_capa_servicio: "fao:caida_ceniza_y_lapilli",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:caida_ceniza_y_lapilli",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:caida_ceniza_y_lapilli"
  },
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 4,
    nombre: "Lahares Amenaza Alta (SGC)",
    nombre_capa: "lahares_amenaza_alta",
    nombre_capa_servicio: "fao:lahares_amenaza_alta",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:lahares_amenaza_alta",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:lahares_amenaza_alta"
  }
];

export const capasCobertura = [
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 5,
    nombre: "Áreas de cobertura por municipio (CLC2018)",
    nombre_capa: "mun_areas_cobertura_clc_2018",
    nombre_capa_servicio: "fao:mun_areas_cobertura_clc_2018",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:mun_areas_cobertura_clc_2018",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:mun_areas_cobertura_clc_2018",
    estadisticas: 'municipio'
  },
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 6,
    nombre: "Cultivos permanentes (UPRA - EVA 2021)",
    nombre_capa: "mun_cul_permanentes_eva2021",
    nombre_capa_servicio: "fao:mun_cul_permanentes_eva2021",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:mun_cul_permanentes_eva2021",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:mun_cul_permanentes_eva2021",
    estadisticas: 'permanente'
  },
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 7,
    nombre: "Cultivos transitorios (UPRA - EVA 2021)",
    nombre_capa: "mun_cul_transitorios_eva2021",
    nombre_capa_servicio: "fao:mun_cul_transitorios_eva2021",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:mun_cul_transitorios_eva2021",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:mun_cul_transitorios_eva2021",
    estadisticas: 'transitorios'
  },
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 8,
    nombre: "Registro pecuario (2021)",
    nombre_capa: "mun_pecuario_2021",
    nombre_capa_servicio: "fao:mun_pecuario_2021",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:mun_pecuario_2021",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:mun_pecuario_2021",
    estadisticas: 'pecuario'
  }
];

export const capasReferencia = [
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 9,
    nombre: "Municipios afectados",
    nombre_capa: "municipio_afectado",
    nombre_capa_servicio: "fao:municipio_afectado",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:municipio_afectado",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:municipio_afectado"
  },
  {
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 10,
    nombre: "Departamentos afectados",
    nombre_capa: "departamento_afectado",
    nombre_capa_servicio: "fao:departamento_afectado",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:departamento_afectado",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:departamento_afectado"
  }
  /*{
    url_servicio: 'http://190.144.114.51:84/geoserver/fao/wms?',
    id: 10,
    nombre: "Departamentos afectados",
    nombre_capa: "departamento_afectado",
    nombre_capa_servicio: "fao:departamento_afectado",
    get_map: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetMap&VERSION=1.1.1&SERVICE=WMS&format=image%2Fpng&layers=fao:departamento_afectado",
    get_capabilities:"http://190.144.114.51:84/geoserver/fao/wms?&REQUEST=GetCapabilities&VERSION=1.1.1&SERVICE=WMS",
    leyenda: "http://190.144.114.51:84/geoserver/fao/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=fao:departamento_afectado"
  }*/
];
