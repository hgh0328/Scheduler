import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
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
    private firestore: Firestore
  ) { }

  ngOnInit(): void {

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

      console.log(raidData);

      var resultArray:any = raidData["일반"];

      var scheduleData = {
        아이디: "대둠바",
        파티단위: this.Party,
        출발시간대: this.Time.toString(),
        포지션: this.Position,
        메모: this.Memo
      }

      this.Raid.forEach(async selectRaidData => {
        console.log(selectRaidData);
        var nomalUserList: any = [];
        if (selectRaidData.indexOf("[일반]") != -1) {

          var index;
          if (raidData["일반"].length == 0) {
            console.log("새로생성");
            nomalUserList.push(scheduleData);
            var resultData = {
              레이드이름: selectRaidData,
              참가자리스트: nomalUserList
            }
            resultArray.push(resultData);
          } else {
            console.log(raidData["일반"]);
            var sameTest = false;
            raidData["일반"].forEach(element => {

              if(element["레이드이름"].indexOf(selectRaidData) != -1) {
                sameTest = true;
                index = element["레이드이름"].indexOf(selectRaidData);
                nomalUserList.push(element["참가자리스트"]);
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
              resultArray.splice(index, 1);
              nomalUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: nomalUserList
              }
              resultArray.push(resultData);
            }
          }
        } else if (selectRaidData.indexOf("[노말]") != -1) {

        } else if (selectRaidData.indexOf("[하드]") != -1) {

        } else if (selectRaidData.indexOf("[기타]") != -1) {

        }
        const washingtonRef = doc(this.firestore, this.Day, "레이드");
        await updateDoc(washingtonRef, {
          일반 : resultArray
        });

      });
      this.bottomSheetRef.dismiss()
    }, 1000);
    }










  }

}
