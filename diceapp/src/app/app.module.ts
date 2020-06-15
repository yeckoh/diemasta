import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { RouterModule, Routes } from '@angular/router';

import { MymatModule } from './mymat/mymat.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WsService } from './services/ws.service';
import { LocaldataService} from './services/localdata.service';
import { RollsComponent } from './rolls/rolls.component';
import { SpellpointsComponent } from './spellpoints/spellpoints.component';
import { StorydiceComponent } from './storydice/storydice.component';
// formsModule is getting imported in mymat importer component

// const appRoutes: Routes = [
//  ];

@NgModule({
  declarations: [
    AppComponent,
    RollsComponent,
    SpellpointsComponent,
    StorydiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MymatModule,
    HttpClientModule,
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [WsService, LocaldataService],
  entryComponents:
    [],
  bootstrap: [AppComponent]
})
export class AppModule { }
