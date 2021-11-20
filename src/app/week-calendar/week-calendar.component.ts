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
  Level_Tab_Selected;    
    Day_Label;
    Level_Menu;
    
      RaidList;
    
    RaidIndex;
    
    RaidArray_Once;
  

  constructor(private MatBottomSheet: MatBottomSheet,
    private firestore: Firestore,
    private route: ActivatedRoute
  ) { }




  ngOnInit() {

      
      /*임시 초기값*/
      this.Level_Menu = "일반";
      this.Day_Label = "수요일";
      

      
      onSnapshot(
      doc(this.firestore, this.Day_Label , "레이드"),
      { includeMetadataChanges: true },
      (doc) => {
        var choiceRaid: any = [];
        var docdata: any;
        docdata = doc.data();
        this.RaidList = docdata[this.Level_Menu];
        });
          
        
      
      
      
      


      

        
      
      

  }
    Day_TabClick(Day_event) {
        
        this.Day_Label = Day_event.tab.textLabel;
       onSnapshot(
      doc(this.firestore, Day_event.tab.textLabel, "레이드"),
      { includeMetadataChanges: true },
      (doc) => {
        var choiceRaid: any = [];
        var docdata: any;
        docdata = doc.data();
        this.RaidList = docdata["일반"];
          console.log(this.RaidList)
      });   
        this.Level_Tab_Selected = 0;      
        
    }
    
    Level_TabClick(Level_event) { 
        
        this.RaidArray_Once = false;         
        this.Level_Menu = Level_event.tab.textLabel;
        this.Level_Tab_Selected = Level_event.index; 
        
            this.RaidList = new Array();
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
                    console.log(this.RaidList)
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

        console.log(this.menuRaidList);
     
    }
    out(){
      if(this.menuId === this.userid){
        window.alert(this.menuId + "님이 나갔습니다.");
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
          
        var GeneralArray:any = raidData[this.menuDifficulty];
        var NomalArray:any = raidData["노말"];
        var HardArray:any = raidData["하드"];
        var EtcArray:any = raidData["기타"];
          
        GeneralArray[this.menuRaidIndex]["참가자리스트"].splice(this.menuId,1);

        if(GeneralArray[this.menuRaidIndex]["참가자리스트"].length == 0){
          GeneralArray.splice(this.menuRaidIndex,1);
        };

          
        await setDoc(doc(this.firestore, this.menuDate, "레이드"), {
          "일반" : GeneralArray,
          "노말" : NomalArray,
          "하드" : HardArray,
          "기타" : EtcArray
        });
      },100);
    }

}
