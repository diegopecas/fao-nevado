import { Component, EventEmitter, Output } from '@angular/core';
import { faLayerGroup, faChartArea, faChartColumn, faChartBar, faXmark, faStreetView, faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ndr-toolbar',
  templateUrl: './ndr-toolbar.component.html',
  styleUrls: ['./ndr-toolbar.component.css']
})
export class NdrToolbarComponent {

  faLayerGroup = faLayerGroup;
  faChartArea = faChartArea;
  faChartBar = faChartBar;
  faChartColumn = faChartColumn;
  faXmark = faXmark;
  faStreetView = faStreetView;
  faVideo = faVideo;
  
  @Output() clickMenu = new EventEmitter<string>();
  
  emitirEvento(evento:any) {
    this.clickMenu.emit(evento);
  }

}
