import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  propagar = new EventEmitter<boolean>();
  
  estado = false;

  constructor() { }

  ngOnInit() {
  }

  menuClick() {
    this.estado = this.estado ? false : true;
    this.propagar.emit(this.estado);
  }

}
