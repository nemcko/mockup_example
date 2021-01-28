import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ResultsService } from '../shared/services/result-service.service'

@Component({
  selector: 'app-person',
  templateUrl: './person-detail.component.html'
})
export class PersonDetailComponent {
  reload: () => {};
  personData = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    gender: new FormControl(''),
    company: new FormControl(''),
    age: new FormControl('')
  });

  constructor(
    private serverResultsService: ResultsService,
    public modal: NgbActiveModal
  ) { }

  saveData() {
    if (this.personData.invalid) {
      return;
    }
    this.serverResultsService.updatePerson(this.personData.value).subscribe(done => {
      this.reload();
      this.modal.close('Ok click')
    });
  }

}
