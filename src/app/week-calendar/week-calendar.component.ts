import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import * as $ from 'jquery';
import { CalendarAddButtonComponent } from '../calendar-add-button/calendar-add-button.component';
import {FormControl} from '@angular/forms';

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
  menuRaidList;
   
  Day_Tab_selected;
  Day_Label;
  Level_Tab_Selected;    
  Level_Menu;
    
  RaidList;
  RaidIndex;
  RaidArray_Once;

  constructor(private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
    private route: ActivatedRoute
  ) { }

  positionUserList:any = [];


  ngOnInit() {
      
      function TodayLabel(){
          var week = new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일');
          
          var today = new Date().getDay();
          var TodayLabel = week[today];

          return TodayLabel;
      }
      
      /*임시 초기값*/
      this.Level_Menu = "일반";
      this.Day_Label = TodayLabel();
      if(this.Day_Label == '수요일'){
          this.Day_Tab_selected = 0
      }
      else if(this.Day_Label == '목요일'){
          this.Day_Tab_selected = 1
      }
      else if(this.Day_Label == '금요일'){
          this.Day_Tab_selected = 2
      }
      else if(this.Day_Label == '토요일'){
          this.Day_Tab_selected = 3
      }
      else if(this.Day_Label == '일요일'){
          this.Day_Tab_selected = 4
      }
      else if(this.Day_Label == '월요일'){
          this.Day_Tab_selected = 5;
      }
      else if(this.Day_Label == '화요일'){
          this.Day_Tab_selected = 6;
      }

      
      onSnapshot(
          doc(this.firestore, this.Day_Label , "레이드"),
          { includeMetadataChanges: true },
          (doc) => {         

        var choiceRaid: any = [];
        var docdata: any;
        docdata = doc.data();              
        this.RaidList = docdata[this.Level_Menu];
         
        this.RaidList.forEach(item => {
          var arrayList:any = item['참가자리스트']
          var positionString:any = "";
          var array:any = []
          var deal = 0;
          var heal = 0;
          var double = 0;
          var test ;
          arrayList.forEach((array,i) => {
            if(array['포지션'] == '딜러'){
              deal++;
            }else if(array['포지션'] == '힐러'){
              heal++;
            }else if(array['포지션'] == '둘다가능'){
              double++;
            }
            
          });

          positionString = "딜러 : " + deal +" / 힐러 : " + heal +" / 둘다가능 : " + double
          this.positionUserList.push(positionString);
         
          
        });

    });

    
    


  }
          
                           
                           
    Day_TabClick(Day_event) {
        this.Level_Tab_Selected = 1;

        this.Day_Label = Day_event.tab.textLabel;        
        setTimeout(()=>{
            this.Level_Tab_Selected = 0;
        },10)
        
    }
    
    Level_TabClick(Level_event) { 
        
        this.RaidArray_Once = false;         
        this.Level_Menu = Level_event.tab.textLabel;
        this.Level_Tab_Selected = Level_event.index; 
        
        this.RaidList = [];
        setTimeout(()=>{
            if(!this.RaidArray_Once){
                 onSnapshot(
                  doc(this.firestore, this.Day_Label , "레이드"),
                  { includeMetadataChanges: true },
                  (doc) => {
                    var choiceRaid: any = [];
                    var docdata: any;
                    docdata = doc.data();
                    this.RaidList = docdata[this.Level_Menu];
                    this.RaidList.forEach(item => {
                  var arrayList:any = item['참가자리스트']
                  var positionString:any = "";
                  var array:any = []
                  var deal = 0;
                  var heal = 0;
                  var double = 0;
                  var test ;
                  arrayList.forEach((array,i) => {
                    if(array['포지션'] == '딜러'){
                      deal++;
                    }else if(array['포지션'] == '힐러'){
                      heal++;
                    }else if(array['포지션'] == '둘다가능'){
                      double++;
                    }

                  });

          positionString = "딜러 : " + deal +" / 힐러 : " + heal +" / 둘다가능 : " + double
          this.positionUserList.push(positionString);
         
          
        });
                }); 
                    this.RaidArray_Once = true;
                }
        }, 100)
    }
    
    
    Calendar_AddButton(){
      this.userid = this.route.snapshot.queryParamMap.get("id");
        this.MatBottomSheet.open(CalendarAddButtonComponent, {
              panelClass: 'OptionModal',
              data: {userid:this.userid}
            }).afterDismissed().subscribe((result) => {
    });

    }

    menuClcik(index,id,date,difficulty,RaidIndex,RaidList){
      console.log("메뉴클릭");
      this.userid = this.route.snapshot.queryParamMap.get("id")
      this.menuIndex = index;
      this.menuId = id;
      this.menuDate = date;
      this.menuDifficulty = difficulty;
      this.menuRaidIndex =  RaidIndex;
      this.menuRaidList =  RaidList[RaidIndex];

     
    }
    out(){
      if(this.menuId === this.userid){
        window.alert(this.menuId + "님이 " + this.menuRaidList["레이드이름"] + "에서 나갔습니다.");
        this.outUser()
      }else{
        window.alert("본인이 아닌 경우 나갈수 없습니다.");
      }
    }
    export(){
      window.alert(this.menuId + "를 " + this.menuRaidList["레이드이름"] + " 에서 내보냈습니다.");
      this.outUser()
    }
    async outUser(){
      const docRef = doc(this.firestore, this.menuDate, "레이드");
      const docSnap = await getDoc(docRef);

      var raidData: any = docSnap.data();
        
      setTimeout(async () => {
          
            var GeneralArray:any = raidData["일반"];        
            var NormalArray:any = raidData["노말"];
            var HardArray:any = raidData["하드"];
            var EtcArray:any = raidData["기타"];
          
          if(this.menuDifficulty == "일반"){             
              GeneralArray[this.menuRaidIndex]["참가자리스트"].splice(this.menuId,1);              
              if(GeneralArray[this.menuRaidIndex]["참가자리스트"].length == 0){
                  GeneralArray.splice(this.menuRaidIndex,1);
                } 
          }
          
          else if(this.menuDifficulty == "노말"){
             
              NormalArray[this.menuRaidIndex]["참가자리스트"].splice(this.menuId,1);
              
              if(NormalArray[this.menuRaidIndex]["참가자리스트"].length == 0){
                  NormalArray.splice(this.menuRaidIndex,1);
                } 
          }
          
          else if(this.menuDifficulty == "하드"){
             
              HardArray[this.menuRaidIndex]["참가자리스트"].splice(this.menuId,1);
              
              if(HardArray[this.menuRaidIndex]["참가자리스트"].length == 0){
                  HardArray.splice(this.menuRaidIndex,1);
                } 
          }
          
          else if(this.menuDifficulty == "기타"){
             
              EtcArray[this.menuRaidIndex]["참가자리스트"].splice(this.menuId,1);
              
              if(EtcArray[this.menuRaidIndex]["참가자리스트"].length == 0){
                  EtcArray.splice(this.menuRaidIndex,1);
                } 
          };
          
        await setDoc(doc(this.firestore, this.menuDate, "레이드"), {
          "일반" : GeneralArray,
          "노말" : NormalArray,
          "하드" : HardArray,
          "기타" : EtcArray
        });
      },100);
    }

}
