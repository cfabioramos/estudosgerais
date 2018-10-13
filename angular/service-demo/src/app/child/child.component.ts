import { InteractionService } from '../interaction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor(private _interactionService: InteractionService){ }

  ngOnInit() {
    this._interactionService.teacherMessage$.subscribe(
    message => {
      if (message === 'Good Morning') {
        alert('Good morning teacher');
      } else if (message === 'Well Done') {
        alert('Thank you teacher');
      }
    });
  }

}
