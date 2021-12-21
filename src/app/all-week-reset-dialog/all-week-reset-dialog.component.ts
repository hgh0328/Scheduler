import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as $ from 'jquery';

@Component({
  selector: 'app-all-week-reset-dialog',
  templateUrl: './all-week-reset-dialog.component.html',
  styleUrls: ['./all-week-reset-dialog.component.css']
})
export class AllWeekResetDialogComponent implements OnInit {

	userid;
  AllCharacterList: any = [];
  Character_WeekList: any = [];
  Character_DayHomework: any = [];

  constructor(
    private MatSnackBar: MatSnackBar,
	@Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private dialogRef: MatDialogRef<AllWeekResetDialogComponent>,
	) { }

  ngOnInit(): void {
	  this.userid = this.data.userid;
    this.AllCharacterList = this.data.AllCharacterList

    var CharacterArray: any = [];
    this.AllCharacterList.forEach(element => {
      var List: any = {};
      var Character_WeekHomework: any = [];
      var Character_DayHomework: any = [];
      element.Week_homeworklist.forEach(item => {
        var ResetValue = false;

        if (item['name'] == "주간 컨텐츠 선택 안함") {
          Character_WeekHomework.push({name:"주간 컨텐츠 선택 안함",value:true})
        }
      else{
        ResetValue = false;
          Character_WeekHomework.push({name:item['name'],value: ResetValue})
        }
      });
      element.Day_homeworklist.forEach(item => {
        if(item['name'] == "일일 컨텐츠 선택 안함"){
          Character_DayHomework.push({name:"일일 컨텐츠 선택 안함",value:true})
        }
        else{
          Character_DayHomework.push({name:item['name'],value:item['value']})
        }
      });

      List = {
        "Job": element['Job'],
        "Name": element['Name'],
        "Level": element['Level'],
        "Day_homeworklist": Character_DayHomework,
        "Week_homeworklist": Character_WeekHomework,
      }
      CharacterArray.push(List)
    });

  }
	async All_WeekHomeWrok_Reset() {

    var CharacterArray: any = [];
    this.AllCharacterList.forEach(element => {
      var List: any = {};
      var Character_WeekHomework: any = [];
      var Character_DayHomework: any = [];
      element.Week_homeworklist.forEach(item => {
        var ResetValue = false;

        if (item['name'] == "주간 컨텐츠 선택 안함") {
          Character_WeekHomework.push({name:"주간 컨텐츠 선택 안함",value:true})
        }
      else{
        ResetValue = false;
          Character_WeekHomework.push({name:item['name'],value: ResetValue})
        }
      });
      element.Day_homeworklist.forEach(item => {
        if(item['name'] == "일일 컨텐츠 선택 안함"){
          Character_DayHomework.push({name:"일일 컨텐츠 선택 안함",value:true})
        }
        else{
          Character_DayHomework.push({name:item['name'],value:item['value']})
        }
      });

      List = {
        "Job": element['Job'],
        "Name": element['Name'],
        "Level": element['Level'],
        "Day_homeworklist": Character_DayHomework,
        "Week_homeworklist": Character_WeekHomework,
      }
      CharacterArray.push(List)
    });

    setTimeout(async () => {
      console.log(CharacterArray);

      await setDoc(doc(this.firestore, "My_Character", this.userid), {
       "캐릭터" : CharacterArray,
      }).then(() => {
          this.MatSnackBar.open(this.userid + "님"  + "\n캐릭터가 초기화되었습니다.", "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });
        this.dialogRef.close();
       });

  });




	}



}
