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
   public Raid:any =[];
   public Time: any;
   public Position: any;
   public Memo: any;

    userid;
    Together_Ok = true;
    Together_user;
	Together_userDate;
	Together_UserList;
	Together_UserList_Raid;
	Together_UserList_Time;
	Together_Member;
  Raid_Build;
  form_Together_Member = [];


  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private route: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<CalendarAddButtonComponent>,
    private firestore: Firestore,
  ) { }

  ngOnInit(): void {

 	this.userid = this.route.snapshot.queryParamMap.get("id");


	  if(this.data.Together_user != undefined){
	   var Together_MemberList: any = [];
		  $(".Together_Ok").addClass("false")
		  this.Together_Ok = false;
		  this.Together_user = this.data.Together_user
		  this.Together_userDate = this.data.Together_userDate
		  this.Together_UserList = this.data.Together_UserList
		  this.Together_UserList_Raid = this.data.Together_UserList_Raid
		  this.Together_UserList_Time = this.data.Together_UserList['출발시간대']
	      Together_MemberList.push(this.Together_user)
	      Together_MemberList.push(this.userid)
	  	  this.Together_Member = Together_MemberList.toString()

		  this.userid = this.Together_Member
		  console.log(this.userid)

	  }









  }
    Raid_Select(){
        // console.log(this.Raid);
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



      if(this.data.Together_user != undefined){

		  if(this.Party == undefined || this.Position == undefined){
				window.alert('선택하지 않은 필드가 존재합니다.\n메모를 제외한 모든 필드를 입력해주세요.');
		  }

      else {

				this.Day = this.Together_userDate;
				this.Raid[0] = this.Together_UserList_Raid;
        this.Time = this.Together_UserList_Time.toString();

        console.log(this.Day)
        console.log(this.Raid[0])
        console.log(this.Time)

        this.Raid_Build = false;
        const docRef = doc(this.firestore, this.Day, "레이드");
        const docSnap = await getDoc(docRef);
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
        아이디: this.userid,
        파티단위: this.Party,
        출발시간대: this.Time.toString(),
        포지션: this.Position,
        메모: memo
      }

      this.Raid.forEach(async selectRaidData => {
        var index;

//       // console.log(selectRaidData);

        var GeneralUserList: any = [];
        var NormalUserList: any = [];
        var HardUserList: any = [];
        var EtcUserList: any = [];

        if (selectRaidData.indexOf("[일반]") != -1) {

          if (raidData["일반"].length == 0) {
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
					sameRiad = true;

				  index=i ;

				  GeneralUserList = element["참가자리스트"];
				}
			});
				if (sameRiad == false) {
					GeneralUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: GeneralUserList

				}

				GeneralArray.push(resultData);
			} else {
				GeneralArray.splice(index,1);

				GeneralUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: GeneralUserList

				}

				GeneralArray.push(resultData);
			}
          }
		}

          else if (selectRaidData.indexOf("[노말]") != -1) {
			  if (raidData["노말"].length == 0) {
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
					sameRiad = true;

				  index=i ;

				  NormalUserList = element["참가자리스트"];
				}
			});
				if (sameRiad == false) {
					NormalUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: NormalUserList

				}

				NormalArray.push(resultData);
			} else {
				NormalArray.splice(index,1);

				NormalUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: NormalUserList

				}

				NormalArray.push(resultData);
			}
          }
		  }
          else if (selectRaidData.indexOf("[하드]") != -1) {
			  if (raidData["하드"].length == 0) {
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
					sameRiad = true;

				  index=i ;

				  HardUserList = element["참가자리스트"];
				}
			});
				if (sameRiad == false) {
					HardUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: HardUserList

				}

				HardArray.push(resultData);
			} else {
				HardArray.splice(index,1);

				HardUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: HardUserList

				}

				HardArray.push(resultData);
			}
          }

//            // console.log(HardArray);


        }
          else if (selectRaidData.indexOf("[기타]") != -1) {
			  if (raidData["기타"].length == 0) {
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
					sameRiad = true;

				  index=i ;

				  EtcUserList = element["참가자리스트"];
				}
			});
				if (sameRiad == false) {
					EtcUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: EtcUserList

				}

				EtcArray.push(resultData);
			} else {
				EtcArray.splice(index,1);

				EtcUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: EtcUserList

				}

				EtcArray.push(resultData);
			}
          }

//            // console.log(EtcArray);


        }



      });

          console.log("빌드 완료");

          if(!this.Raid_Build){
           await setDoc(doc(this.firestore, this.Day, "레이드"), {

           "일반" : GeneralArray,
           "노말" : NormalArray,
           "하드" : HardArray,
           "기타" : EtcArray

          });
            this.Raid_Build = true;
            console.log("빌드 완료");

          }


      this.bottomSheetRef.dismiss()
    }, 1000);

          if(this.Raid.length > 1){
		  window.alert(this.userid + "님 " + "[" + this.Day + "] 스케쥴\n" + this.Raid[0] + " 외 " + (this.Raid.length - 1) + "개의" + " 일정이 추가되었습니다.");
		 }
          else{
			  window.alert(this.userid + "님 " + "[" + this.Day + "] 스케쥴\n" + this.Raid[0] + " 일정이 추가되었습니다.");
          };
		  $(".jhlostark").addClass("Opened");
      }
// 여기가 끝
      }
      else{
      if (this.Day == undefined || this.Party == undefined || this.Raid == undefined || this.Time == undefined || this.Position == undefined) {
		  window.alert('선택하지 않은 필드가 존재합니다.\n메모를 제외한 모든 필드를 입력해주세요.');

        }

      else {

      this.Raid_Build = false;

      const docRef = doc(this.firestore, this.Day, "레이드");
      const docSnap = await getDoc(docRef);
/*
      // console.log(docSnap.data());
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

//       // console.log(selectRaidData);

        var GeneralUserList: any = [];
        var NormalUserList: any = [];
        var HardUserList: any = [];
        var EtcUserList: any = [];

        if (selectRaidData.indexOf("[일반]") != -1) {

          if (raidData["일반"].length == 0) {
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
					sameRiad = true;

				  index=i ;

				  GeneralUserList = element["참가자리스트"];
				}
			});
				if (sameRiad == false) {
					GeneralUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: GeneralUserList

				}

				GeneralArray.push(resultData);
			} else {
				GeneralArray.splice(index,1);

				GeneralUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: GeneralUserList

				}

				GeneralArray.push(resultData);
			}
          }
		}

          else if (selectRaidData.indexOf("[노말]") != -1) {
			  if (raidData["노말"].length == 0) {
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
					sameRiad = true;

				  index=i ;

				  NormalUserList = element["참가자리스트"];
				}
			});
				if (sameRiad == false) {
					NormalUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: NormalUserList

				}

				NormalArray.push(resultData);
			} else {
				NormalArray.splice(index,1);

				NormalUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: NormalUserList

				}

				NormalArray.push(resultData);
			}
          }
		  }
          else if (selectRaidData.indexOf("[하드]") != -1) {
			  if (raidData["하드"].length == 0) {
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
					sameRiad = true;

				  index=i ;

				  HardUserList = element["참가자리스트"];
				}
			});
				if (sameRiad == false) {
					HardUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: HardUserList

				}

				HardArray.push(resultData);
			} else {
				HardArray.splice(index,1);

				HardUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: HardUserList

				}

				HardArray.push(resultData);
			}
          }

//            // console.log(HardArray);


        }
          else if (selectRaidData.indexOf("[기타]") != -1) {
			  if (raidData["기타"].length == 0) {
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
					sameRiad = true;

				  index=i ;

				  EtcUserList = element["참가자리스트"];
				}
			});
				if (sameRiad == false) {
					EtcUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: EtcUserList

				}

				EtcArray.push(resultData);
			} else {
				EtcArray.splice(index,1);

				EtcUserList.push(scheduleData);

				var resultData = {

					레이드이름: selectRaidData,

					참가자리스트: EtcUserList

				}

				EtcArray.push(resultData);
			}
          }

//            // console.log(EtcArray);


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
//            // console.log("빌드 완료");

          }

      this.bottomSheetRef.dismiss()
    }, 1000);

          if(this.Raid.length > 1){
		  window.alert(this.userid + "님 " + "[" + this.Day + "] 스케쥴\n" + this.Raid[0] + " 외 " + (this.Raid.length - 1) + "개의" + " 일정이 추가되었습니다.");
		 }
          else{
			  window.alert(this.userid + "님 " + "[" + this.Day + "] 스케쥴\n" + this.Raid[0] + " 일정이 추가되었습니다.");
          };
		  $(".jhlostark").addClass("Opened");


    }






      }



  }

}
