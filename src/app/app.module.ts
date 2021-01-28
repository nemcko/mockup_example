import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonsComponent } from './persons/persons.component';
import { ResultsService } from './shared/services/result-service.service';
import { PersonDetailComponent } from './persons/person-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonDetailComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDatatableModule,
  ],
  providers: [
    ResultsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
