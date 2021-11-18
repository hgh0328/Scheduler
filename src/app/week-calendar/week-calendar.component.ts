import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.css']
})
export class WeekCalendarComponent implements OnInit {

   public Party: any;
   public Day: any;
   public Raid: any;
   public Time: any;
   public Position: any;
   public Memo: any;



  constructor() { }

  ngOnInit(): void {
  }
	chlickevent(){
		if(this.Raid.length > 1){
			
          console.log(this.Raid[0] + " 외 " + (this.Raid.length - 1) + " 개");
		  $(".mat-select-value-text").text(this.Raid[0] + " 외 " + (this.Raid.length - 1) + " 개");
     
		}
	}

}
