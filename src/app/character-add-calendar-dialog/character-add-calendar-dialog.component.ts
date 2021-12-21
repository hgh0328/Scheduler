import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-character-add-calendar-dialog',
  templateUrl: './character-add-calendar-dialog.component.html',
  styleUrls: ['./character-add-calendar-dialog.component.css']
})
export class CharacterAddCalendarDialogComponent implements OnInit {

  userid;
  Character_index;
  Character_Job;
  Character_Name;
  Character_Level;
  Character_DayList;
  Character_WeekList;

  constructor(
	@Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private dialogRef: MatDialogRef<CharacterAddCalendarDialogComponent>,
	) { }

  ngOnInit(): void {
	  this.userid = this.data.userid
	  this.Character_index = this.data.Character_index
	  this.Character_Job = this.data.Character_Job
	  this.Character_Name = this.data.Character_Name
    this.Character_Level = this.data.Character_Level
    this.Character_DayList = this.data.Character_DayList
	  this.Character_WeekList = this.data.Character_WeekList

  }

  async Week_Calendar_Charater() {




	}

  }
