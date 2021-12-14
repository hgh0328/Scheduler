import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-remove-character-dialog',
  templateUrl: './remove-character-dialog.component.html',
  styleUrls: ['./remove-character-dialog.component.css']
})
export class RemoveCharacterDialogComponent implements OnInit {
  userid;
  Character_index;
  Character_Job;
  Character_Name;
  Character_Level;
  constructor(	
	
	@Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private dialogRef: MatDialogRef<RemoveCharacterDialogComponent>,	 
	) { }

  ngOnInit(): void {
	  this.userid = this.data.userid
	  this.Character_index = this.data.Character_index
	  this.Character_Job = this.data.Character_Job
	  this.Character_Name = this.data.Character_Name
	  this.Character_Level = this.data.Character_Level
  }
	
}
