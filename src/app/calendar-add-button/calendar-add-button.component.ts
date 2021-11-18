import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import * as $ from 'jquery';

@Component({
  selector: 'app-calendar-add-button',
  templateUrl: './calendar-add-button.component.html',
  styleUrls: ['./calendar-add-button.component.css']
})
export class CalendarAddButtonComponent implements OnInit {

    public Party: any;
   public Day: any;
   public Raid: any;
   public Time: any;
   public Position: any;
   public Memo: any;

  constructor(private bottomSheetRef: MatBottomSheetRef<CalendarAddButtonComponent>) { }

  ngOnInit(): void {

  }
    Raid_Select(){
        console.log(this.Raid);
		if(this.Raid.length > 1){
		  $(".Raid_Select .mat-select-value-text").text(this.Raid[0] + " 외 " + (this.Raid.length - 1) + " 개");     
		}
	}
    
    Time_Select(){
        console.log(this.Time);
		if(this.Time.length > 1){
		  $(".Time_Select .mat-select-value-text").text("다양한 시간대");     
		}
	}
    close() {
    this.bottomSheetRef.dismiss()
  }

}
