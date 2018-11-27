import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group({
    userName: ['Fábio Ramos'],
    password: [''],
    confirmPassword: [''],
    address : this.fb.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Fábio'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address : new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });
  
  loadApiData() {
    this.registrationForm.setValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'Salvador',
        state: 'Bahia',
        postalCode: '40230-117'
      }
    });
    
    this.registrationForm.patchValue({
      userName: 'Carlos Fábio R Conceição',
      password: 'test2',
      confirmPassword: 'test2'
    });
    
  }
  
}
