import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as $ from 'jquery';

@Component({
  selector: 'app-remove-character-dialog',
  templateUrl: './remove-character-dialog.component.html',
  styleUrls: ['./remove-character-dialog.component.css']
})
export class RemoveCharacterDialogComponent implements OnInit {
  userid;
  Character_index;
  Character_Job;
  Character_Name;
  Character_Level;
  constructor(
    private MatSnackBar: MatSnackBar,
	@Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
    private dialogRef: MatDialogRef<RemoveCharacterDialogComponent>,
	) { }

  ngOnInit(): void {

	  this.userid = this.data.userid
	  this.Character_index = this.data.Character_index
	  this.Character_Job = this.data.Character_Job
	  this.Character_Name = this.data.Character_Name
	  this.Character_Level = this.data.Character_Level
  }

  async Remove_Charater() {
    var CharacterArray: any = []
		const docRef = doc(this.firestore, "My_Character", this.userid);
    const docSnap = await getDoc(docRef);
    var myList: any = docSnap.data();
    CharacterArray = myList['캐릭터']
    var RemoveCharterList = CharacterArray[this.Character_index]

    setTimeout(async () => {

      CharacterArray.splice(this.Character_index,1);
              if(CharacterArray.length == 0){
                CharacterArray.splice(this.Character_index,1);
              }

      await setDoc(doc(this.firestore, "My_Character", this.userid), {
        "캐릭터" : CharacterArray,
      }).then(()=>{
          this.MatSnackBar.open(this.userid + "님"  + this.Character_Job + "/" + this.Character_Name + "\n캐릭터가 삭제되었습니다.", "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });
       });
    });
    onSnapshot(
      doc(this.firestore, 'My_Character', this.userid),
      { includeMetadataChanges: true },
      async (doc) => {
        var My_Character_List: any;
        My_Character_List = doc.data();
      });
      this.dialogRef.close();

	}

}
