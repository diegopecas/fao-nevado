import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { departamentos } from 'src/app/common/data/departamentos';
import { municipios } from 'src/app/common/data/municipios';
import { transitorios } from 'src/app/common/data/transitorios';
import { cultivosTransitorios as cultivos } from 'src/app/common/data/cultivos';
import { ChartOptions } from 'chart.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-transitorios',
  templateUrl: './transitorios.component.html',
  styleUrls: ['./transitorios.component.css']
})
export class TransitoriosComponent implements OnInit {

  @Output() emDepartamentoSeleccionado = new EventEmitter();
  @Output() emMunicipioSeleccionado = new EventEmitter();

  constructor(){

  }

  public listaDepartamentos: Array<any> = [];
  public departamentoSeleccionado = '';
  public listaMunicipios: Array<any> = [];
  public municipioSeleccionado = '';
  public dataCultivos:Array<any> = []
  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels:Array<any> = [];
  public pieChartDatasets:Array<any> = [
    {
      data: [],
    },
  ];
  public pieChartLegend = true;

  ngOnInit() {
    this.listaDepartamentos = departamentos;
  }

  cambiarDepartamento() {
    this.listaMunicipios = municipios.filter(
      (f) => f.codigo_depto == this.departamentoSeleccionado
    );
    this.emDepartamentoSeleccionado.emit(this.departamentoSeleccionado);
  }

  cambiarMunicipio() {
    const muni = transitorios.filter(
      (f) => f.codigomuni == +this.municipioSeleccionado
    );
    
    const arreglo = Object.entries(muni[0])
      .map(([name, value]) => ({ name: name.replace(/_/g, ''), value }))
      .filter((item) => cultivos.includes(item.name))
      .filter((f) => f.value && +f.value > 0);
    
    this.dataCultivos = arreglo;
    
    this.pieChartLabels = arreglo.map(m=>m.name);
    this.pieChartDatasets[0].data = arreglo.map(m=>m.value);
    this.emMunicipioSeleccionado.emit(this.municipioSeleccionado);
  }

  /** Función para exportar tabla html a excel */
  exportexcel() {

    /** nombre del archivo excel a exportar. */
    // tslint:disable-next-line: max-line-length
    const nombreArchivo = 'datos-transitorios.xlsx';

    /* table id is passed over here */
    const element = document.getElementById('data');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'datos transitorios');

    /* save to file */
    XLSX.writeFile(wb, nombreArchivo);
  }
}
