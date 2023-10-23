import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userForm: FormGroup;
  submittedRecords: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  /**
   * 
   * @returns submit filled data
   */
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const record = this.userForm.value;
    if (this.submittedRecords.some(r => r.email === record.email)) {
      alert('Email already exist!');
      return;
    }

    this.submittedRecords.push(record);
    this.submittedRecords.sort((a, b) => b.amount - a.amount); // sort in descending order
    this.userForm.reset();
  }

  /**
   * 
   * @param index Delete record from table
   */
  deleteRecord(index: number) {
    this.submittedRecords.splice(index, 1);
  }

 
}


