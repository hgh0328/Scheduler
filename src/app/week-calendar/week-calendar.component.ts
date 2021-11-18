import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import * as $ from 'jquery';
import { CalendarAddButtonComponent } from '../calendar-add-button/calendar-add-button.component';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.css']
})
export class WeekCalendarComponent implements OnInit {





  constructor(private MatBottomSheet: MatBottomSheet,) { }

  ngOnInit(): void {
  }
    Calendar_AddButton(){
        this.MatBottomSheet.open(CalendarAddButtonComponent, {
              panelClass: 'OptionModal',
              data: {}
            }).afterDismissed().subscribe((result) => {

    });
        
    }

}
