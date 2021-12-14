import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-all-week-reset-dialog',
  templateUrl: './all-week-reset-dialog.component.html',
  styleUrls: ['./all-week-reset-dialog.component.css']
})
export class AllWeekResetDialogComponent implements OnInit {
	
	userid;
	AllCharacterList:any =[];

  constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private dialogRef: MatDialogRef<AllWeekResetDialogComponent>,	 
	) { }

  ngOnInit(): void {
	  
	  this.userid = this.data.userid;
	  this.AllCharacterList = this.data.AllCharacterList
	  console.log(this.userid)
	  console.log(this.AllCharacterList)
  }

}
