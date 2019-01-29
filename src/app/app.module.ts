import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './appbar/appbar.component';
import { MaterialModule} from './material/material.module';
import { OtherListsModule } from './other-lists/other-lists.module';
import { NewlistComponent } from './appbar/newlist/newlist.component';
import {NewlistDialogComponent} from './appbar/newlist/newlist.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    OtherListsModule
  ],

  declarations: [
    AppComponent,
    AppbarComponent,
    NewlistComponent,
    NewlistDialogComponent,
  ],
  entryComponents: [NewlistDialogComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}

