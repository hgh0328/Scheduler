import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot } from 'firebase/firestore';

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

     onSnapshot(
       doc(this.firestore, 'My_Character' , this.userid),
       { includeMetadataChanges: true },
       (doc) => {
//   			var Character_list: any = [];
   			var My_Character_List: any;
   			My_Character_List = doc.data();
         console.log(My_Character_List)
       });



  }
  
  close() {
    this.bottomSheetRef.dismiss()
  }

	save(){

	}



}
