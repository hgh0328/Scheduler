import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-notice',
  templateUrl: './event-notice.component.html',
  styleUrls: ['./event-notice.component.css']
})
export class EventNoticeComponent implements OnInit {
  userid;

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.userid = this.route.snapshot.queryParamMap.get("id");
  }

}
