import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { NgChartsModule } from 'ng2-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NdrToolbarComponent } from './components/map/paneles/ndr-toolbar/ndr-toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CapasComponent } from './components/map/paneles/capas/capas.component';
import { TransitoriosComponent } from './components/map/paneles/transitorios/transitorios.component';
import { PermanentesComponent } from './components/map/paneles/permanentes/permanentes.component';
import { PecuariosComponent } from './components/map/paneles/pecuarios/pecuarios.component';
import { CoberturaMunicipiosComponent } from './components/map/paneles/cobertura-municipios/cobertura-municipios.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './components/map/paneles/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    NdrToolbarComponent,
    CapasComponent,
    TransitoriosComponent,
    PermanentesComponent,
    PecuariosComponent,
    CoberturaMunicipiosComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    LeafletModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
