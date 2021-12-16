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
import { WeekResetDialogComponent } from '../week-reset-dialog/week-reset-dialog.component';
import { AllWeekResetDialogComponent } from '../all-week-reset-dialog/all-week-reset-dialog.component';


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

  test
  tableList
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<MyHorkWrokCheckListComponent>,
    private firestore: Firestore,
  ) {
  }

  ngOnInit(): void {
    this.userid = this.data.userid
    this.Search_resulttext = false;
    this.Character_Load = true;



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
      window.alert(this.userid + "님 숙제 리스트가 저장되었습니다.");
     });




    // setTimeout(async () => {



    // });

  }
  All_Week_Reset(dataSource) {
	  console.log(dataSource._data._value);
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
  Week_Reset(index, Job, Name, Level,DayList, WeekList) {
    const dialogRef = this.dialog.open(WeekResetDialogComponent, {
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


