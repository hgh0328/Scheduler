import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
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
	public Character_WeekHomework:any =[];
	public Character_DayHomework:any =[];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private dialogRef: MatDialogRef<AddCharacterDialogComponent>,
  ) {


   }

  ngOnInit(): void {
    this.userid = this.data.userid
  }

	Raid_Select(){
		if(this.Character_WeekHomework.length > 1){
		  $(".Raid_Select .mat-select-value-text").text(this.Character_WeekHomework[0] + " 외 " + (this.Character_WeekHomework.length - 1) + " 개");

		}
  }

  async Add_Character() {
    if(this.Character_Job == undefined || this.Character_Name == undefined || this.Character_Level == undefined){
      window.alert(this.userid + "님 입력되지 않은 값이 존재합니다.\n필수 입력사항을 확인해주세요.");
    }
    else {
      var Character_DayHomework:any=[];
      this.Character_DayHomework.forEach(element => {
        Character_DayHomework.push({name:element,value:false})
      });
      var Character_WeekHomework:any=[];
      this.Character_WeekHomework.forEach(element => {
        Character_WeekHomework.push({name:element,value:false})
      });

      var CharacterArray: any = []
      var CharacterList:any = []

      await getDocs(collection(this.firestore, "My_Character")).then((collection) => {

        collection.forEach((doc) => {
          if (doc.id === this.userid) {
            var myList: any = doc.data()
            CharacterArray= myList['캐릭터'];
          }
        });
      })
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
		  
      }).then(()=>{
        window.alert(this.userid + "님 추가완료");
		  this.dialogRef.close();

       });
    }

  }



}
