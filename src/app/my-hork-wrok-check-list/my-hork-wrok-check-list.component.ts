import { Component, Inject, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot } from 'firebase/firestore';
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



     onSnapshot(
       doc(this.firestore, 'My_Character' , this.userid),
       { includeMetadataChanges: true },
       (doc) => {
//   			var Character_list: any = [];
   			var My_Character_List: any;
   			My_Character_List = doc.data();

           var tableList =My_Character_List['캐릭터']
           this.dataSource = new MatTableDataSource(tableList);
	       this.dataSource.sort = this.sort;
	  		var false_Completion_Week = 0;
			var true_Completion_Week = 0;
	  		var false_Completion_Day = 0;
			var true_Completion_Day = 0;
	  		tableList.forEach((item)=>{
				
				false_Completion_Week = 0;
			    true_Completion_Week = 0;
				false_Completion_Day = 0;
			    true_Completion_Day = 0;
				item['Week_homeworklist'].forEach((list)=>{
						if(list['value'] == false){
							false_Completion_Week++
						}
						else{
							true_Completion_Week++
						}

					});
				item['Day_homeworklist'].forEach((list)=>{
						if(list['value'] == false){
							false_Completion_Day++
						}
						else{
							true_Completion_Day++
						}

					});
					this.Completion_Week.push({ok:true_Completion_Week,none:false_Completion_Week});
					this.Completion_Day.push({ok:true_Completion_Day,none:false_Completion_Day});
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

	save(){
    window.alert(this.userid + "님의 정보가 저장되었습니다.");
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
  Week_Reset(index, Job, Name, Level, WeekList) {
    const dialogRef = this.dialog.open(WeekResetDialogComponent, {
      panelClass: 'Setting_Dialog_Defult',
      data: {
		 userid: this.userid,
		 Character_index : index,
		 Character_Job : Job,
		 Character_Name : Name,
		 Character_Level : Level,
		 Character_WeekList : WeekList,		  
      }
    });
  }
}


