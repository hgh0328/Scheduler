import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { addDoc, collection, doc, getDoc, updateDoc,setDoc  } from 'firebase/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-calendar-add-button',
  templateUrl: './calendar-add-button.component.html',
  styleUrls: ['./calendar-add-button.component.css']
})
export class CalendarAddButtonComponent implements OnInit {

    public Party: any;
   public Day: any;
   public Raid: any;
   public Time: any;
   public Position: any;
   public Memo: any;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CalendarAddButtonComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);


  }
    Raid_Select(){
		if(this.Raid.length > 1){
		  $(".Raid_Select .mat-select-value-text").text(this.Raid[0] + " 외 " + (this.Raid.length - 1) + " 개");
		}
	}

    Time_Select(){

		if(this.Time.length > 1){
		  $(".Time_Select .mat-select-value-text").text("다양한 시간대");
		}
	}
    close() {
    this.bottomSheetRef.dismiss()
  }

  async save() {
    if (this.Day == undefined || this.Party == undefined || this.Raid == undefined || this.Time == undefined || this.Position == undefined) {
      window.alert('값을 모두 입력해주세요.');
    } else {
      const docRef = doc(this.firestore, this.Day, "레이드");
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());

      var raidData: any = docSnap.data();
      setTimeout(() => {

      var resultArray:any = raidData["일반"];

      var memo
      if(this.Memo ==undefined){
        memo = "";
      }else{
        memo = this.Memo;
      }

      var scheduleData = {
        아이디: this.data.userid,
        파티단위: this.Party,
        출발시간대: this.Time.toString(),
        포지션: this.Position,
        메모: memo
      }

      this.Raid.forEach(async selectRaidData => {
        var index;
        console.log(selectRaidData);
        var nomalUserList: any = [];
        if (selectRaidData.indexOf("[일반]") != -1) {


          if (raidData["일반"].length == 0) {
            console.log("새로생성");
            nomalUserList.push(scheduleData);
            var resultData = {
              레이드이름: selectRaidData,
              참가자리스트: nomalUserList
            }
            resultArray.push(resultData);
          } else {
            var sameTest = false;
            raidData["일반"].forEach((element,i) => {
              if(element["레이드이름"].indexOf(selectRaidData) != -1) {
                console.log(element["레이드이름"]);

                sameTest = true;
                index=i ;
                nomalUserList = element["참가자리스트"];
              }
            });
            if (sameTest == false) {
              //새로생성
              console.log("새로생성");
              nomalUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: nomalUserList
              }
              resultArray.push(resultData);
            } else {
              //추가
              console.log("추가");
              console.log(index);

              resultArray.splice(index,1);
              nomalUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: nomalUserList
              }
              resultArray.push(resultData);
            }
          }
          console.log(resultArray);
          await setDoc(doc(this.firestore, this.Day, "레이드"), {
            "일반" : resultArray
          });
        } else if (selectRaidData.indexOf("[노말]") != -1) {

        } else if (selectRaidData.indexOf("[하드]") != -1) {

        } else if (selectRaidData.indexOf("[기타]") != -1) {

        }

      });
      this.bottomSheetRef.dismiss()
    }, 1000);
    }










  }

}
