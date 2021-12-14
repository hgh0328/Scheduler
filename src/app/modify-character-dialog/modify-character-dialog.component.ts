import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-modify-character-dialog',
  templateUrl: './modify-character-dialog.component.html',
  styleUrls: ['./modify-character-dialog.component.css']
})
export class ModifyCharacterDialogComponent implements OnInit {

  public Character_DayHomework:any =[];
  public Character_WeekHomework:any =[];
  userid;
  Character_index;
  Character_Job;
  Character_Name;
  Character_Level;
  Chraracter_DayList:any =[];
  Chraracter_WeekList:any =[];

	
  constructor(	
	@Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private dialogRef: MatDialogRef<ModifyCharacterDialogComponent>,	 
	) { }

  ngOnInit(): void {
	  this.userid = this.data.userid
	  this.Character_index = this.data.Character_index
	  this.Character_Job = this.data.Character_Job
	  this.Character_Name = this.data.Character_Name
	  this.Character_Level = this.data.Character_Level
	  this.Character_DayHomework = this.data.Character_DayList
	  this.Character_WeekHomework = this.data.Character_WeekList
	  
	  	this.Character_DayHomework.forEach((list)=>{
	     this.Chraracter_DayList.push(list.name)
		});

		this.Character_WeekHomework.forEach((list)=>{
		this.Chraracter_WeekList.push(list.name)
			console.log(this.Chraracter_WeekList.length)
		})
	setTimeout(()=>{
      if(this.Chraracter_WeekList.length > 1){
			  $(".Raid_Select .mat-select-value-text").text(this.Chraracter_WeekList[0] + " 외 " + (this.Chraracter_WeekList.length - 1) + " 개");
		}
    },100)
        


		

  }
	
	Raid_Select(){
		if(this.Chraracter_WeekList.length > 1){
		  $(".Raid_Select .mat-select-value-text").text(this.Chraracter_WeekList[0] + " 외 " + (this.Chraracter_WeekList.length - 1) + " 개");

		}
  }

}
