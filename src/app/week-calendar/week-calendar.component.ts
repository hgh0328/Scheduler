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
    
//  raidList = ["오레하 2종","아르고스 1페","아르고스 3페","도전 어비스 던전"]
  GeneralList ;
  NomarlList ;

  ngOnInit() {


    onSnapshot(
      doc(this.firestore, "수요일", "레이드"),
      { includeMetadataChanges: true },
      (doc) => {
        var choiceRaid: any = [];
        var docdata: any;
        docdata = doc.data();
        this.GeneralList = docdata["일반"];
        this.NomarlList = docdata["노말"];

      });


  }
    Calendar_AddButton(){
      this.userid = this.route.snapshot.queryParamMap.get("id");
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
        window.alert(this.menuId + "님을 내보냈습니다.");
        this.outUser()
      }else{
        window.alert("본인이 아닌 경우 나갈수 없습니다.");
      }
    }
    export(){
      window.alert(this.menuId + "를 내보냈습니다.");
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
        var GeneralArray:any = raidData[this.menuDifficulty];
        GeneralArray[this.menuRaidIndex]["참가자리스트"].splice(this.menuId,1);
        if(GeneralArray[this.menuRaidIndex]["참가자리스트"].length == 0){
          GeneralArray.splice(this.menuRaidIndex,1);
        }
        await setDoc(doc(this.firestore, this.menuDate, "레이드"), {
          "일반" : GeneralArray,
          "노말" : nomalArray,
          "하드" : hardArray,
          "기타" : etcArray
        });
      },100);
    }

}
