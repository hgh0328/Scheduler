import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import * as $ from 'jquery';
import { CalendarAddButtonComponent } from '../calendar-add-button/calendar-add-button.component';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.css']
})
export class WeekCalendarComponent implements OnInit {

  userid;
  menuIndex;
  menuId;
  menuDate;
  menuDifficulty;
  menuRaidIndex;

  constructor(private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
    private route: ActivatedRoute
  ) { }

  // <mat-option value="오레하2종">[일반] 오레하 2종</mat-option>
	//   <mat-option value="아르고스1페">[일반] 아르고스 1페</mat-option>
	//   <mat-option value="아르고스3페">[일반] 아르고스 3페</mat-option>
	//   <mat-option value="도비스2종">[일반] 도전 어비스 던전 2종</mat-option>
	// </mat-optgroup>

  //   <mat-optgroup label="노말" (click)="Raid_Select()">
	//   <mat-option value="노말발탄">[노말] 발탄</mat-option>
	//   <mat-option value="노말비아키스">[노말] 비아키스</mat-option>
	//   <mat-option value="노말쿠크세이튼">[노말] 쿠크세이튼</mat-option>
	//   <mat-option value="노말아브렐슈드">[노말] 아브렐슈드</mat-option>
	// </mat-optgroup>

	// <mat-optgroup label="하드" (click)="Raid_Select()">
	//   <mat-option value="하드발탄">[하드] 발탄</mat-option>
	//   <mat-option value="하드비아키스">[하드] 비아키스</mat-option>
	//   <mat-option value="하드쿠크세이튼">[하드] 쿠크세이튼</mat-option>
	//   <mat-option value="하드아브렐슈드">[하드] 아브렐슈드</mat-option>
	// </mat-optgroup>

	// <mat-optgroup label="기타" (click)="Raid_Select()">
	//   <mat-option value="쿠크리허설">[기타] 쿠크세이튼 리허설</mat-option>
	//   <mat-option value="아브렐슈드데자뷰">[기타] 아브렐슈드 데자뷰</mat-option>
  raidList = ["오레하 2종","아르고스 1페","아르고스 3페","도전 어비스 던전"]
  nomalList ;

  ngOnInit() {


    onSnapshot(
      doc(this.firestore, "수요일", "레이드"),
      { includeMetadataChanges: true },
      (doc) => {
        var choiceRaid: any = [];
        var docdata: any;
        docdata = doc.data();
        this.nomalList = docdata["일반"];

      });





    // item.forEach((doc) => {
    //     console.log(doc.data());
    //   var test = [];
    //   test.push(doc.data()["name"])
    //     // if(doc.id === userid){
    //     //   console.log("id맞음");

    //     // }
    //     // console.log(doc.id, " => ", doc.data());
    //   });

  }
    Calendar_AddButton(){
      this.userid = this.route.snapshot.queryParamMap.get("id")
        this.MatBottomSheet.open(CalendarAddButtonComponent, {
              panelClass: 'OptionModal',
              data: {userid:this.userid}
            }).afterDismissed().subscribe((result) => {

    });

    }

    menuClcik(index,id,date,difficulty,raidIndex){
      console.log("메뉴클릭");

      this.userid = this.route.snapshot.queryParamMap.get("id")
      this.menuIndex = index;
      this.menuId = id;
      this.menuDate = date;
      this.menuDifficulty = difficulty;
      this.menuRaidIndex =  raidIndex ;
    }
    out(){
      if(this.menuId === this.userid){
        this.outUser()
      }else{
        window.alert("본인만 나갈 수 있습니다.")
      }
    }
    export(){
      this.outUser()
    }
    async outUser(){
      const docRef = doc(this.firestore, this.menuDate, "레이드");
      const docSnap = await getDoc(docRef);

      var raidData: any = docSnap.data();
      setTimeout(async () => {
        var nomalArray:any = raidData["노말"];
        var hardArray:any = raidData["하드"];
        var etcArray:any = raidData["기타"];
        var resultArray:any = raidData[this.menuDifficulty];
        resultArray[this.menuRaidIndex]["참가자리스트"].splice(this.menuId,1);
        if(resultArray[this.menuRaidIndex]["참가자리스트"].length == 0){
          resultArray.splice(this.menuRaidIndex,1);
        }
        await setDoc(doc(this.firestore, this.menuDate, "레이드"), {
          "일반" : resultArray,
          "노말" : nomalArray,
          "하드" : hardArray,
          "기타" : etcArray
        });
      },100);
    }

}
