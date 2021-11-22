import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { addDoc, collection, doc, getDoc, updateDoc,setDoc  } from 'firebase/firestore';import * as $ from 'jquery';

import { ActivatedRoute } from '@angular/router';

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
   userid;
   Raid_Build;

  constructor(
    private route: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<CalendarAddButtonComponent>,
    private firestore: Firestore,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit(): void {

/*
    console.log(this.data);
*/
      this.userid = this.route.snapshot.queryParamMap.get("id");


  }
    Raid_Select(){
		if(this.Raid.length > 1){
		  $(".Raid_Select .mat-select-value-text").text(this.Raid[0] + " 외 " + (this.Raid.length - 1) + " 개");
		}
	}

    Time_Select(){

		if(this.Time.length > 1){
		  $(".Time_Select .mat-select-value-text").text(this.Time[0] + " 외 " + (this.Time.length - 1) + " 개");
		}
	}
    close() {
    this.bottomSheetRef.dismiss()
  }

  async save() {  
      
    this.Raid_Build = false;

    if (this.Day == undefined || this.Party == undefined || this.Raid == undefined || this.Time == undefined || this.Position == undefined) {
      window.alert('캘린더 일정 추가에 빈값이 존재합니다. 메모를 제외한 모든 필드를 입력해주세요.');
    } 
      else {
    
       
          
      const docRef = doc(this.firestore, this.Day, "레이드");
      const docSnap = await getDoc(docRef);
/*
      console.log(docSnap.data());
*/

      var raidData: any = docSnap.data();
      setTimeout(async () => {

      var GeneralArray:any = raidData["일반"];
      var NormalArray:any = raidData["노말"];
      var HardArray:any = raidData["하드"];
      var EtcArray:any = raidData["기타"];

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

//       console.log(selectRaidData);

        var GeneralUserList: any = [];
        var NormalUserList: any = [];
        var HardUserList: any = [];
        var EtcUserList: any = [];
          
        if (selectRaidData.indexOf("[일반]") != -1) {

          if (raidData["일반"].length == 0) {

//            console.log("새로생성");

            GeneralUserList.push(scheduleData);
            var resultData = {
              레이드이름: selectRaidData,
              참가자리스트: GeneralUserList
            }
            GeneralArray.push(resultData);
          } 
            else {
            var sameRiad = false;
            raidData["일반"].forEach((element,i) => {
                
              if(element["레이드이름"].indexOf(selectRaidData) != -1) {

//                console.log(element["레이드이름"]);


                sameRiad = true;
                index=i ;
                GeneralUserList = element["참가자리스트"];
              }
            });
            if (sameRiad == false) {
                
              //새로생성

//              console.log("새로생성");

              GeneralUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: GeneralUserList
              }
              GeneralArray.push(resultData);
            } else {
                
              //추가
//              console.log("추가");
//              console.log(index);


              GeneralArray.splice(index,1);
              GeneralUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: GeneralUserList
              }
              GeneralArray.push(resultData);
            }
          }

//            console.log(GeneralArray);



        }
          
          else if (selectRaidData.indexOf("[노말]") != -1) {
              if (raidData["노말"].length == 0) {

//            console.log("새로생성");

            NormalUserList.push(scheduleData);
            var resultData = {
              레이드이름: selectRaidData,
              참가자리스트: NormalUserList
            }
            NormalArray.push(resultData);
          } 
            else {
            var sameRiad = false;
            raidData["노말"].forEach((element,i) => {
                
              if(element["레이드이름"].indexOf(selectRaidData) != -1) {

//                console.log(element["레이드이름"]);


                sameRiad = true;
                index=i ;
                NormalUserList = element["참가자리스트"];
              }
            });
            if (sameRiad == false) {
                
              //새로생성

//              console.log("새로생성");

              NormalUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: NormalUserList
              }
              NormalArray.push(resultData);
            } else {
                
              //추가
//              console.log("추가");
//              console.log(index);


              NormalArray.splice(index,1);
              NormalUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: NormalUserList
              }
              NormalArray.push(resultData);
            }
          }

//            console.log(NormalArray);


        }
          else if (selectRaidData.indexOf("[하드]") != -1) {
              if (raidData["하드"].length == 0) {

//            console.log("새로생성");

            HardUserList.push(scheduleData);
            var resultData = {
              레이드이름: selectRaidData,
              참가자리스트: HardUserList
            }
            HardArray.push(resultData);
          } 
            else {
            var sameRiad = false;
            raidData["하드"].forEach((element,i) => {
                
              if(element["레이드이름"].indexOf(selectRaidData) != -1) {

//                console.log(element["레이드이름"]);


                sameRiad = true;
                index=i ;
                HardUserList = element["참가자리스트"];
              }
            });
            if (sameRiad == false) {
                
              //새로생성

//              console.log("새로생성");

              HardUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: HardUserList
              }
              HardArray.push(resultData);
            } else {
                
              //추가
//              console.log("추가");
//              console.log(index);


              HardArray.splice(index,1);
              HardUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: HardUserList
              }
              HardArray.push(resultData);
            }
          }

//            console.log(HardArray);
      

        } 
          else if (selectRaidData.indexOf("[기타]") != -1) {
             if (raidData["기타"].length == 0) {

//            console.log("새로생성");

            EtcUserList.push(scheduleData);
            var resultData = {
              레이드이름: selectRaidData,
              참가자리스트: EtcUserList
            }
            EtcArray.push(resultData);
          } 
            else {
            var sameRiad = false;
            raidData["기타"].forEach((element,i) => {
                
              if(element["레이드이름"].indexOf(selectRaidData) != -1) {

//                console.log(element["레이드이름"]);


                sameRiad = true;
                index=i ;
                EtcUserList = element["참가자리스트"];
              }
            });
            if (sameRiad == false) {
                
              //새로생성

//              console.log("새로생성");

              EtcUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: EtcUserList
              }
              EtcArray.push(resultData);
            } else {
                
              //추가
//              console.log("추가");
//              console.log(index);


              EtcArray.splice(index,1);
              EtcUserList.push(scheduleData);
              var resultData = {
                레이드이름: selectRaidData,
                참가자리스트: EtcUserList
              }
              EtcArray.push(resultData);
            }
          }

//            console.log(EtcArray);
      

        }
          
        

      });
          if(!this.Raid_Build){
         await setDoc(doc(this.firestore, this.Day, "레이드"), {

           "일반" : GeneralArray,
           "노말" : NormalArray,
           "하드" : HardArray,
           "기타" : EtcArray
             
          });
            this.Raid_Build = true;
            console.log("빌드 완료");
            console.log(GeneralArray);
          }
          
      this.bottomSheetRef.dismiss()
    }, 1000);
          
          if(this.Raid.length > 1){
		  window.alert(this.userid + "님 " + "[" + this.Day + "] 스케쥴\n" + this.Raid[0] + " 외 " + (this.Raid.length - 1) + "개의" + " 일정이 추가되었습니다.");
		 }
          else{
             window.alert(this.userid + "님 " + "[" + this.Day + "] 스케쥴\n" + this.Raid[0] + " 일정이 추가되었습니다.");  
          };      
          
         
    }










  }

}