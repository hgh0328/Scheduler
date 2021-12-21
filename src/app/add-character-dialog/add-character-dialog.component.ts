import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-character-dialog',
  templateUrl: './add-character-dialog.component.html',
  styleUrls: ['./add-character-dialog.component.css']
})
export class AddCharacterDialogComponent implements OnInit {

    userid;
	public Character_Job: any;
	public Character_Name: any;
	public Character_Level: any;
	public Character_NoHomeWork:any =[];
	public Character_WeekHomework:any =[];
	public Character_DayHomework:any =[];


  constructor(
    private MatSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private dialogRef: MatDialogRef<AddCharacterDialogComponent>,
  ) {


   }

  ngOnInit(): void {
    this.userid = this.data.userid
  }

  Week_Select() {

      if(this.Character_WeekHomework[0] == '선택 안함'){
          console.log("a")
      }
		if(this.Character_WeekHomework.length > 1){
		  $(".Raid_Select .mat-select-value-text").text(this.Character_WeekHomework[0] + " 외 " + (this.Character_WeekHomework.length - 2) + " 개");

		}
  }



  async Add_Character() {

    if (this.Character_Job == undefined || this.Character_Name == undefined || this.Character_Level == undefined || this.Character_DayHomework.length == 0 || this.Character_WeekHomework.length == 0) {

      if (this.Character_DayHomework.length == 0 && this.Character_WeekHomework.length == 0) {
        this.Character_DayHomework = [];
        this.Character_WeekHomework = [];
        this.Character_DayHomework = ["선택 안함"];
        this.Character_WeekHomework = ["선택 안함"];
        this.MatSnackBar.open(this.userid + "님 컨텐츠를 설정하지 않아.\n모든 컨텐츠가 선택 안함으로 변경됩니다.", "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });
      }
      else if (this.Character_DayHomework.length == 0 && this.Character_WeekHomework.length > 0) {
        this.Character_DayHomework = [];
        this.Character_DayHomework = ["선택 안함"];
          this.MatSnackBar.open(this.userid + "님 일일 컨텐츠를 설정하지 않아.\n일일 컨텐츠가 선택 안함으로 변경됩니다.", "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });
      }
      else if (this.Character_WeekHomework.length == 0 && this.Character_DayHomework.length > 0) {
        this.Character_WeekHomework = [];
        this.Character_WeekHomework = ["선택 안함"];
          this.MatSnackBar.open(this.userid + "님 주간 컨텐츠를 설정하지 않아.\n주간 컨텐츠가 선택 안함으로 변경됩니다.", "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });
      }
      else{
        this.MatSnackBar.open(this.userid + "님 입력되지 않은 값이 존재합니다.\n필수 입력사항을 확인해주세요.", "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });


    }



    }

    else {
      var Character_DayHomework: any = [];
      this.Character_DayHomework.forEach(element => {
        if (element == "선택 안함") {
          Character_DayHomework.push({ name: "일일 컨텐츠 선택 안함", value: true })
        }
        else {
          Character_DayHomework.push({ name: element, value: false })
        }

      });
      var Character_WeekHomework: any = [];
      this.Character_WeekHomework.forEach(element => {
        if (element == "선택 안함") {
          Character_WeekHomework.push({ name: "주간 컨텐츠 선택 안함", value: true })
        }
        else {
          Character_WeekHomework.push({ name: element, value: false })
        }
      });

      var CharacterArray: any = []
      var CharacterList: any = []

      await getDocs(collection(this.firestore, "My_Character")).then((collection) => {

        collection.forEach((doc) => {
          if (doc.id === this.userid) {
            var myList: any = doc.data()
            CharacterArray = myList['캐릭터'];
          }
        });
      })
      var List = {
        "Job": this.Character_Job,
        "Name": this.Character_Name,
        "Level": this.Character_Level,
        "Day_homeworklist": Character_DayHomework,
        "Week_homeworklist": Character_WeekHomework,
      }
      CharacterArray.push(List)
      await setDoc(doc(this.firestore, "My_Character", this.userid), {
        "캐릭터": CharacterArray,

      }).then(() => {
        this.MatSnackBar.open(this.userid + "님 캐릭터 추가 완료되었습니다.\n" + this.Character_Job + "/" + this.Character_Name, "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });
        this.dialogRef.close();

      });
      await getDocs(collection(this.firestore, "Day_Reset")).then(async (collection) => {
        var date = new Date().getDate();
        var Day_Reset_List = true;
        await setDoc(doc(this.firestore, "Day_Reset", this.userid), {
          "Day": date,
          "Reset": Day_Reset_List,
        }).then(() => {
        });


      });

    }
  }

  }

