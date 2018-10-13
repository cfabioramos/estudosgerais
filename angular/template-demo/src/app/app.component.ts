import { ChildComponent } from './child/child.component';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  pageTitle = 'Angular Component Interaction';
  imgUrl = 'https://picsum.photos/200';
  count = 0;
  name: string;
  userName: string;
  private _customerName: string;
  @ViewChild('nameRef') nameElementRef: ElementRef;
  
  //Child component
  userLoggedIn = false;
  @ViewChild(ChildComponent) childComponentRef: ChildComponent;
  
  ngAfterViewInit(): void {
    this.nameElementRef.nativeElement.focus();
    
    this.childComponentRef.mensagemDoPai = 'Meu fi, as muié tá tudo aí.';
  }
  
  get customerName(): string {
    return this._customerName;
  }
  
  set customerName(value){
    this._customerName = value;
    
    if (value === 'Fabio' || value === 'Fábio') {
      alert('Hello Fábio');
    }
  }
  
  incrementCount(){
    this.count += 1;
  }
  
  greetVishwas(updatedValue) {
    this.userName = updatedValue; 
    if (this.userName === 'Fabio' || this.userName === 'Fábio') {
      alert('Welcome back Fábio');
    }
  }
  
  greetFromChilds(name: string) {
    alert('Olar ' + name);
  }
  
}
