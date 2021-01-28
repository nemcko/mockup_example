import { Component, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  IPage,
  ICorporateEmployee
} from '../shared/interfaces'
import { ResultsService } from '../shared/services/result-service.service'
import { PersonDetailComponent } from './person-detail.component'

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  page: IPage = <IPage>{};
  rows = new Array<ICorporateEmployee>();
  search: string = '';

  columns = [
    // NOTE: cells for current page only !
    { name: 'Name' },
    { name: 'Gender' },
    { name: 'Company' },
  ];

  ColumnMode = ColumnMode;

  constructor(
    private serverResultsService: ResultsService,
    private modalService: NgbModal
  ) {
    this.page.offset = this.page.count = 0;
    this.page.limit = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo: IPage) {
    this.page.offset = pageInfo.offset;
    this.serverResultsService.getResults(this.page, this.search).subscribe(respData => {
      this.page.count = respData.total;
      this.rows = respData.result;
    });
  }

  onEnter(val: string) {
    this.search = val;
    this.setPage({ offset: 0 });
  }

  onNewRow() {
    this.showDialog({
      id: '',
      name: '',
      gender: 'Male',
      company: '',
      age: 0
    });
  }

  onEditRow(row: ICorporateEmployee) {
    this.showDialog(row);
  }

  onDeleteRow(row: ICorporateEmployee) {
    this.serverResultsService.deletePerson(row).subscribe(respData => {
      this.setPage(this.page);
    });
  }

  protected showDialog(row: ICorporateEmployee) {
    const modalRef = this.modalService.open(PersonDetailComponent);
    modalRef.componentInstance.personData.setValue(row)
    modalRef.componentInstance.reload = () => { this.setPage(this.page) };
  }
}