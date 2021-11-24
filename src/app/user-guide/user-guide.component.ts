import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrls: ['./user-guide.component.css']
})
export class UserGuideComponent implements OnInit {

  userid;
  constructor(
	private route: ActivatedRoute,
	) { }

  ngOnInit(): void {
	  this.userid = this.route.snapshot.queryParamMap.get("id");
  }

}
