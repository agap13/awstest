import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AddDataComponent } from './add-data/add-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilestackModule } from '@filestack/angular';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    FetchDataComponent,
    AddDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FilestackModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'add-data', component: AddDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
