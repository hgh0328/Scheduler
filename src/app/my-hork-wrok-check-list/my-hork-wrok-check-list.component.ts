import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-hork-wrok-check-list',
  templateUrl: './my-hork-wrok-check-list.component.html',
  styleUrls: ['./my-hork-wrok-check-list.component.css']
})
export class MyHorkWrokCheckListComponent implements OnInit {

  userid;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private route: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<MyHorkWrokCheckListComponent>,
    private firestore: Firestore,
  ) { }

  ngOnInit(): void {
    this.userid = this.data.userid
    console.log(this.userid)

  //   onSnapshot(
  //     doc(this.firestore, this.Day_Label , "레이드"),
  //     { includeMetadataChanges: true },
  //     (doc) => {
  // var choiceRaid: any = [];
  // var docdata: any;
  // docdata = doc.data();

  //   )
    }


}
