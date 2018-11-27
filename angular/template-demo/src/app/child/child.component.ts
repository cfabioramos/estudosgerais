import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnChanges {

  constructor() { }

  @Input() loggedIn: boolean;
  
  private _autenticado: boolean;
  mensagem: string;
  mensagemDoPai: string;
  
  name = 'Fabio Ramos';
  @Output() greetEvent = new EventEmitter();
    
  get autenticado(): boolean {
    return this._autenticado;
  }
  
  @Input()
  set autenticado(value: boolean) {
    this._autenticado = value;
    
    if (value) {
      this.mensagem = 'Bem vindo de volta Fábio';
    } else {
      this.mensagem = 'Por favor, autentique-se';
    }
    
  }
  
  /*
   * Angular calls this method whenever it detects changes
   * to input properties of the component.
   *  
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    /*
     * I could implement here to set the appropriate value of the message attribute.
     */
  }
  
  greetFabio() {
    alert('Hey Fábio');
  }
  
  callParentGreet() {
    this.greetEvent.emit(this.name);
  }

}
