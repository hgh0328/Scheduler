import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})


export class TestpageComponent implements OnInit {
  mococo = 0;

  constructor() { }

  ngOnInit(): void {


	setInterval(() => {    
	  
    if (this.mococo == 100) {
	  $(".Event_Progress .mat-progress-bar-fill").addClass("done")
	  $(".Event_Result").fadeIn()
      clearInterval();
    }
	else{ this.mococo++}
	}, 75);

  }

}
