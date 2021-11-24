import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-qn-a',
  templateUrl: './user-qn-a.component.html',
  styleUrls: ['./user-qn-a.component.css']
})
export class UserQnAComponent implements OnInit {
  userid;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.userid = this.route.snapshot.queryParamMap.get("id");
  }

}
