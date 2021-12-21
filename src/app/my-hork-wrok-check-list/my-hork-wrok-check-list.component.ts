import { Component, Inject, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddCharacterDialogComponent } from '../add-character-dialog/add-character-dialog.component';
import { ModifyCharacterDialogComponent } from '../modify-character-dialog/modify-character-dialog.component';
import { RemoveCharacterDialogComponent } from '../remove-character-dialog/remove-character-dialog.component';
import { AllWeekResetDialogComponent } from '../all-week-reset-dialog/all-week-reset-dialog.component';
import { CharacterAddCalendarDialogComponent } from '../character-add-calendar-dialog/character-add-calendar-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as $ from 'jquery';


export interface UserData {
  Job: string;
  Name: string;
  Level: number;
  Day_homeworklist: boolean;
  Week_homeworklist: boolean;
}



@Component({
  selector: 'app-my-hork-wrok-check-list',
  templateUrl: './my-hork-wrok-check-list.component.html',
  styleUrls: ['./my-hork-wrok-check-list.component.css']
})

export class MyHorkWrokCheckListComponent implements OnInit {

	displayedColumns: string[] = ['Job', 'Name', 'Level', 'Day_homeworklist', 'Week_homeworklist','action'];
  	dataSource: MatTableDataSource<UserData>;
	@ViewChild(MatSort) sort: MatSort;
  	userid;
	Completion_Week_none = 0;
	Completion_Week_Ok = 0;
	Completion_Week :any = [];
	Completion_Day_none = 0;
	Completion_Day_Ok = 0;
	Completion_Day :any = [];
	Search_resulttext: boolean;
	Character_Load: boolean;
  dialogRef: any;

  tableList
  constructor(
    private MatSnackBar: MatSnackBar,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<MyHorkWrokCheckListComponent>,
    private firestore: Firestore,
  ) {
  }

  async ngOnInit(): Promise<void> {

    this.userid = this.data.userid
    this.Search_resulttext = false;
    this.Character_Load = true;
    


    await getDocs(collection(this.firestore, "Day_Reset")).then((collection) => {
      var date = new Date().getDate();

      collection.forEach(async (DaySnap) => {
        var Day_ResetyList: any = DaySnap.data();
        if (DaySnap.id === this.userid) {
          if (Day_ResetyList.Day == date) {
            if (Day_ResetyList.Reset == false) {
//              console.log('일일 초기화');
              Day_ResetyList.Day = date
              Day_ResetyList.Reset = true;
              await setDoc(doc(this.firestore, "Day_Reset", this.userid), {
                "Day": Day_ResetyList.Day,
                "Reset": Day_ResetyList.Reset,
              }).then(() => {
                this.DayReset_System()
              });

            }
            else {
              console.log('이미 일일 초기화가 완료되었습니다.');              
            }
          }
          else {
            Day_ResetyList.Day = date
//            console.log('일일 초기화');
            Day_ResetyList.Reset = true;
            await setDoc(doc(this.firestore, "Day_Reset", this.userid), {
              "Day": Day_ResetyList.Day,
              "Reset": Day_ResetyList.Reset,
            }).then(() => {
              this.DayReset_System()
            });
          }
        }

      });
    });
    
   
                        
    
    



	if(this.Character_Load){
     onSnapshot(
       doc(this.firestore, 'My_Character' , this.userid),
       { includeMetadataChanges: true },
       async (doc) => {
	  	if(doc.data() != undefined){
   			var My_Character_List: any;
   			My_Character_List = doc.data();
           this.tableList = My_Character_List['캐릭터']
           this.dataSource = new MatTableDataSource(this.tableList);
	       this.dataSource.sort = this.sort;
			this.Completion_Week = [];
			this.Completion_Day = [];
      		this.tableList.forEach((item)=>{

				var false_Completion_Day = 0;
				var true_Completion_Day = 0;
				var false_Completion_Week = 0;
				var true_Completion_Week = 0;
				item['Day_homeworklist'].forEach((list)=>{
						if(list['value'] == false){
							false_Completion_Day++
						}
						else{
							true_Completion_Day++
						}

				});
				item['Week_homeworklist'].forEach((list)=>{
						if(list['value'] == false){
							false_Completion_Week++
						}
						else{
							true_Completion_Week++
						}
					});
					this.Completion_Day.push({ok:true_Completion_Day,none:false_Completion_Day});
					this.Completion_Week.push({ok:true_Completion_Week,none:false_Completion_Week});
				    this.Character_Load = false;
				});
			}
		  else{
			  var My_Character_List:any = [];
			  this.tableList = My_Character_List
			  this.dataSource = new MatTableDataSource(this.tableList);
      }

       });




  		}
	}
  async DayReset_System() {   
    var DayResetCharacter: any = [];          
    await getDocs(collection(this.firestore, "My_Character")).then((collection) => {
      var CharacterArray: any = [];
       
      
      collection.forEach((doc) => {
        if (doc.id === this.userid) {
          var myList: any = doc.data()
          CharacterArray= myList['캐릭터'];
          CharacterArray.forEach(element => {
            var List: any = {};
            var Character_WeekHomework: any = [];
            var Character_DayHomework: any = [];
            element.Week_homeworklist.forEach(item => {  
              if (item['name'] == "주간 컨텐츠 선택 안함") {
                Character_WeekHomework.push({name:"주간 컨텐츠 선택 안함",value:true})
              }
            else{
              
                Character_WeekHomework.push({name:item['name'],value: item['value']})
              }
            });
            element.Day_homeworklist.forEach(item => {
              var ResetValue = false;
              if(item['name'] == "일일 컨텐츠 선택 안함"){
                Character_DayHomework.push({name:"일일 컨텐츠 선택 안함",value:true})
              }
              else{
                ResetValue = false;
                Character_DayHomework.push({name:item['name'],value:ResetValue})
              }
            });
      
            List = {
              "Job": element['Job'],
              "Name": element['Name'],
              "Level": element['Level'],
              "Day_homeworklist": Character_DayHomework,
              "Week_homeworklist": Character_WeekHomework,
            }
            DayResetCharacter.push(List)
          });        
        }
      });      
    });
    setTimeout(async () => {
      await setDoc(doc(this.firestore, "My_Character", this.userid), {
       "캐릭터" : DayResetCharacter,
      }).then(() => {
            this.MatSnackBar.open(this.userid + "님"  + "\n일일 컨텐츠 초기화되었습니다.", "확인", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000,
          });
       });

  });
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
	  this.Search_resulttext = true;
  }



  close() {
    this.bottomSheetRef.dismiss();
  }

  Day_list(i,DayI, Daylist) {
   this.tableList[i]['Day_homeworklist'][DayI]['value'] = Daylist.selected;
			this.Completion_Day = [];
      		this.tableList.forEach((item)=>{
				var false_Completion_Day = 0;
				var true_Completion_Day = 0;
				item['Day_homeworklist'].forEach((list)=>{
						if(list['value'] == false){
							false_Completion_Day++
						}
						else{
							true_Completion_Day++
						}

				});

					this.Completion_Day.push({ok:true_Completion_Day,none:false_Completion_Day});
				    this.Character_Load = false;
				});
 	}
 Week_list(i,WeekI, Weeklist) {
   this.tableList[i]['Week_homeworklist'][WeekI]['value'] = Weeklist.selected;
	 this.Completion_Week = [];
      		this.tableList.forEach((item)=>{
				var false_Completion_Week = 0;
				var true_Completion_Week = 0;
				item['Week_homeworklist'].forEach((list)=>{
						if(list['value'] == false){
							false_Completion_Week++
						}
						else{
							true_Completion_Week++
						}
					});
					this.Completion_Week.push({ok:true_Completion_Week,none:false_Completion_Week});
				    this.Character_Load = false;
				});
 	}

  async Save() {


    await setDoc(doc(this.firestore, "My_Character", this.userid), {
      "캐릭터" : this.tableList,
    }).then(()=>{
            this.MatSnackBar.open(this.userid + "님 컨텐츠 리스트가 저장되었습니다.", "확인", {
            horizontalPosition: "center",
            verticalPosition: "top",
            duration: 3000,
          });

     });




    // setTimeout(async () => {



    // });

  }
  All_Week_Reset(dataSource) {
    const dialogRef = this.dialog.open(AllWeekResetDialogComponent, {
      panelClass: 'Setting_Dialog_Defult',
      data: {
		 userid: this.userid,
		 AllCharacterList : dataSource._data._value
      }
    });

  }

  Add_Character() {
    const dialogRef = this.dialog.open(AddCharacterDialogComponent, {
      panelClass: 'Dialog_Defult',
      data: {

		 userid: this.userid
      }

    });
    dialogRef.afterClosed().subscribe(result => {
	  this.Character_Load = true;

    });

  }
  Modify_Character(index, Job, Name, Level, DayList, WeekList) {

    const dialogRef = this.dialog.open(ModifyCharacterDialogComponent, {
      panelClass: 'Dialog_Defult',
      data: {
		 userid: this.userid,
		 Character_index : index,
		 Character_Job : Job,
		 Character_Name : Name,
		 Character_Level : Level,
		 Character_DayList : DayList,
		 Character_WeekList : WeekList,
      }
    });

  }
  Remove_Character(index, Job, Name, Level) {
    const dialogRef = this.dialog.open(RemoveCharacterDialogComponent, {
      panelClass: 'Setting_Dialog_Defult',
      data: {
		 userid: this.userid,
		 Character_index : index,
		 Character_Job : Job,
		 Character_Name : Name,
		 Character_Level : Level,

      }
    });

  }
  Week_Calendar(index, Job, Name, Level,DayList, WeekList) {
    const dialogRef = this.dialog.open(CharacterAddCalendarDialogComponent, {
      panelClass: 'Setting_Dialog_Defult',
      data: {
		 userid: this.userid,
		 Character_index : index,
		 Character_Job : Job,
		 Character_Name : Name,
		 Character_Level : Level,
		 Character_DayList : DayList,
		 Character_WeekList : WeekList,
      }
    });
  }
}


