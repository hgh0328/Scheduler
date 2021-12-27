import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
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
  Character_DayList:any =[];
  Character_WeekList: any = [];
  My_Character_DayList;
  My_Character_WeekList;


  constructor(
    private MatSnackBar: MatSnackBar,
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
    this.My_Character_DayList = this.Character_DayHomework
    this.My_Character_WeekList = this.Character_WeekHomework


	  	this.Character_DayHomework.forEach((list)=>{
	     this.Character_DayList.push(list.name)
		});

		this.Character_WeekHomework.forEach((list) => {
		  if (list['name'] == '주간 컨텐츠 선택 안함') {
			list.name = '주간 컨텐츠 선택 안함'
			this.Character_WeekList.push(list.name)
		  }
			this.Character_WeekList.push(list.name)
		})

	setTimeout(()=>{
      if(this.Character_WeekList.length > 1){
			  $(".Raid_Select .mat-select-value-text").text(this.Character_WeekList[0] + " 외 " + (this.Character_WeekList.length - 1) + " 개");
		}
    },100)



  }

	Week_Select() {
        if(this.Character_WeekList[0] == ["선택 안함"]){
          this.Character_WeekList = [];
        }

		if(this.Character_WeekList.length > 1){
		  $(".Raid_Select .mat-select-value-text").text(this.Character_WeekList[0] + " 외 " + (this.Character_WeekList.length - 1) + " 개");

		}
    }

    Day_Select() {
        if(this.Character_DayList[0] == ["선택 안함"]){
          this.Character_DayList = [];
        }

    }

  DayNone_Select() {
      this.Character_DayList = [];
      this.Character_DayList  = ["선택 안함"];

    }


  WeekNone_Select() {
      this.Character_WeekList = [];
    this.Character_WeekList = ["선택 안함"];
      $(".Raid_Select .mat-select-value-text").text(this.Character_WeekList[0]);

  }

  async Modify_Character() {


    if (this.Character_Job == undefined || this.Character_Name == undefined || this.Character_Level == undefined || this.Character_DayHomework.length == 0 || this.Character_WeekHomework.length == 0) {


    if (this.Character_DayHomework.length == 0 && this.Character_WeekHomework.length == 0) {
      this.Character_DayHomework = ["선택 안함"];
      this.Character_WeekHomework = ["선택 안함"];
    }
    else if (this.Character_DayHomework.length == 0 && this.Character_WeekHomework.length > 0) {
      this.Character_DayHomework = ["선택 안함"];
    }
    else if (this.Character_WeekHomework.length == 0 && this.Character_DayHomework.length > 0) {
      this.Character_WeekHomework = ["선택 안함"];
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

        await getDocs(collection(this.firestore, "My_Character")).then((collection) => {
          collection.forEach((doc) => {
            if (doc.id === this.userid) {
              var myList: any = doc.data()
              CharacterArray= myList['캐릭터'];
			
            }
          });
        })

        var Character_DayHomework:any=[];
        this.Character_DayList.forEach(element => {
        if(element == "선택 안함"){
          Character_DayHomework.push({name:"일일 컨텐츠 선택 안함",value:true})
        }
        else{
          Character_DayHomework.push({name:element,value:false})
        }

        });
        var Character_WeekHomework:any=[];
        this.Character_WeekList.forEach(element => {
        if(element == "선택 안함"){
            Character_WeekHomework.push({name:"주간 컨텐츠 선택 안함",value:true})
          }
        else{
          Character_WeekHomework.push({name:element,value:false})
        }
        });

      var CharacterArray: any = []
      var CharacterList:any = []


      var List = {
        "Job": this.Character_Job,
        "Name": this.Character_Name,
        "Level": this.Character_Level,
        "Day_homeworklist": Character_DayHomework,
        "Week_homeworklist" : Character_WeekHomework,
      }

	var CharacterArray: any = []
	const docRef = doc(this.firestore, "My_Character", this.userid);
    const docSnap = await getDoc(docRef);
    var myList: any = docSnap.data();
    CharacterArray = myList['캐릭터']
    var RemoveCharterList = CharacterArray[this.Character_index]
	CharacterArray.splice(this.Character_index,1,List);

    setTimeout(async () => {
      await setDoc(doc(this.firestore, "My_Character", this.userid), {
        "캐릭터" : CharacterArray,
      }).then(()=>{
          this.MatSnackBar.open(this.userid + "님 캐릭터 수정 완료되었습니다.\n" + this.Character_Job + "/" + this.Character_Name, "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });
		  this.dialogRef.close();

       });
    })
  }
  }

}
