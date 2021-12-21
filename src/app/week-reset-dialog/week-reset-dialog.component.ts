import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as $ from 'jquery';

@Component({
  selector: 'app-week-reset-dialog',
  templateUrl: './week-reset-dialog.component.html',
  styleUrls: ['./week-reset-dialog.component.css']
})
export class WeekResetDialogComponent implements OnInit {

  userid;
  Character_index;
  Character_Job;
  Character_Name;
  Character_Level;
  Character_DayList;
  Character_WeekList;

  constructor(
     private MatSnackBar: MatSnackBar,
	@Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private dialogRef: MatDialogRef<WeekResetDialogComponent>,
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

  async Reset_Charater() {
    var CharacterArray: any = []

    await getDocs(collection(this.firestore, "My_Character")).then((collection) => {
      collection.forEach((doc) => {
        if (doc.id === this.userid) {
          var myList: any = doc.data()
          CharacterArray= myList['캐릭터'];
        }
      });
    });


    var Character_WeekHomework: any = [];

    this.Character_WeekList.forEach(element => {

      if (element['name'] == "주간 컨텐츠 선택 안함") {
        Character_WeekHomework.push({name:"주간 컨텐츠 선택 안함",value:true})
      }
    else{
        element['value'] = false;
        Character_WeekHomework.push({name:element['name'],value: this.Character_WeekList[this.Character_index]['value']})
      }
    });

    var Character_DayHomework:any=[];
      this.Character_DayList.forEach(element => {
		  if(element['name'] == "일일 컨텐츠 선택 안함"){
			  Character_DayHomework.push({name:"일일 컨텐츠 선택 안함",value:true})
		  }
		  else{
			  Character_DayHomework.push({name:element['name'],value:element['value']})
		  }

      });
    setTimeout(async () => {

      CharacterArray.splice(this.Character_index,1);
              if(CharacterArray.length == 0){
                CharacterArray.splice(this.Character_index,1);
              }

      var List = {
        "Job": this.Character_Job,
        "Name": this.Character_Name,
        "Level": this.Character_Level,
        "Day_homeworklist": Character_DayHomework,
        "Week_homeworklist" : Character_WeekHomework,
      }
      CharacterArray.push(List)

      await setDoc(doc(this.firestore, "My_Character", this.userid), {
       "캐릭터" : CharacterArray,
      }).then(() => {

          this.MatSnackBar.open(this.userid + "님"  + this.Character_Job + "/" + this.Character_Name + "\n캐릭터가 초기화되었습니다.", "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });
        this.dialogRef.close();
       });

  });



	}

  }

