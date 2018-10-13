import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registrationForm = new FormGroup({
    userName: new FormControl('Fábio'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address : new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl('')
    })
  });
  
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
      userName: 'Fabomba',
      password: 'test2',
      confirmPassword: 'test2'
    });
    
  }
  
}
