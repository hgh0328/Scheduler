import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})


export class TestpageComponent implements OnInit {
  mococo = 0;
  userid;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userid = this.route.snapshot.queryParamMap.get("id");


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
