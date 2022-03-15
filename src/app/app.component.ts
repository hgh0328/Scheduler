import { Component, Output, ViewChild,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import * as $ from 'jquery';
import { MatSidenav } from '@angular/material/sidenav';
import { doc } from '@firebase/firestore';
import { Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import { UserGuideModalComponent } from './user-guide-modal/user-guide-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface CarDan_Group {
  letter: string;
  names: string[];
}

export interface Aman_Group {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

	stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });

  public IdText: any;
  public PasswordText: any;

  @ViewChild('settings') public settings: MatSidenav;

  title = 'LOSTARK_Scheduler_by_JH';
  hide = true;
  hide2 = true;
  hide3 = true;
  showFiller = false;
  login = false;
  userid;
  Guide_Modal;
	CarDan_Groups: CarDan_Group[] = [
    {
      letter: '카단',
      names: [
'1월의상태',
'HK278',
'K여포',
'공초',
'긴바나나',
'남자만좋아해',
'노마블러드워',
'데둠미',
'동쓰알카',
'들기름모코코무침',
'똘렝',
'라즈베리단풍',
'명장도화백',
'모쿄건',
'비온계',
'빛수련',
'빠흐흐',
'뽀야마요',
'상콤한가지',
'소서뇽스',
'수어통역사서기',
'신성범위',
'아따비',
'아리아나기갈데',
'야이빙충아',
'오빠는어디가커',
'옥댄버',
'윤시은',
'이밴절리스타',
'인조인간91호',
'점화걸면정화',
'축복영업사원',
'티거라하오',
'펭난나',
'피카소테루',
'핑후',
'해질녘시티',
'형제뒤에서뭐해요',
'흑로남불',
		],
    },
		]
	Aman_Groups: Aman_Group[] = [
    {
      letter: '아만',
      names: [
'갱뽀',
'골든리트리버키운다',
'귀찮네이거',
'급양반장',
'미노르바',
'북국너구리',
'산길',
'울프람오메가',
'지존해완',
'호시하츠',	  
	  ],
    },
		]

	Cardan_GroupOptions: Observable<CarDan_Group[]>;
	Aman_GroupOptions: Observable<Aman_Group[]>;

  constructor(
    private MatSnackBar: MatSnackBar,
    private MatBottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore,
	private _formBuilder: FormBuilder
  ){}
	
	ngOnInit(): void {
		

	this.Cardan_GroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.CarDan_filterGroup(value)),
    );
	this.Aman_GroupOptions = this.stateForm.get('stateGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this.Aman_filterGroup(value)),
    );



    if (window.location.href.indexOf("id") != -1) {
      this.IdText = this.route.snapshot.queryParamMap.get("id");
        this.login =true
        $(".Main_PanelBox").fadeIn(300);
      }
          else{
        this.login = false;
        $(".Main_PanelBox").fadeOut(300);
      this.router.navigate(['/']);
      this.MatSnackBar.open("로그인을 다시 시도해 주세요.", "확인", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
      });
      }
    }

		private CarDan_filterGroup(value: string): CarDan_Group[] {
		if (value) {
		  return this.CarDan_Groups
			.map(group => ({letter: group.letter, names: _filter(group.names, value)}))
			.filter(group => group.names.length > 0);
		}

		return this.CarDan_Groups;
	  }

		private Aman_filterGroup(value: string): Aman_Group[] {
			if (value) {
			  return this.Aman_Groups
				.map(group => ({letter: group.letter, names: _filter(group.names, value)}))
				.filter(group => group.names.length > 0);
			}

			return this.Aman_Groups;
		  }

	Login(){
		if(this.IdText == "점화걸면정화" && this.PasswordText == "3280"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			$(".Main_SettingButtonBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });

		}
		else if(this.IdText == "점화걸면정화" && this.PasswordText != "3280"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "데둠미" && this.PasswordText == "8418"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			$(".Main_SettingButtonBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + " 데둠배빵빵데둠배빵빵데둠배빵빵데둠배빵빵데둠배빵빵데둠배빵빵데둠배빵빵데둠배빵빵데둠배빵빵데둠배빵빵데둠배빵빵데둠배빵빵이 부헤헤 안뇽 방가워", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "데둠미" && this.PasswordText != "8418"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*카단 ~ 아만 순*/

		/*카단섭*/
		/*펭난나 서머너*/
		else if(this.IdText == "펭난나" && this.PasswordText == "951215"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n환상의 나라 에~버~랜드", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "펭난나" && this.PasswordText != "951215"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}


		/*인조인간91호*/
		else if(this.IdText == "인조인간91호" && this.PasswordText == "28452600"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n인조인간 ~ 로보트 ~ ", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "인조인간91호" && this.PasswordText != "28452600"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*긴바나나 소서리스*/
		else if(this.IdText == "긴바나나" && this.PasswordText == "1231"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n이태원바나나는 제겁니다.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "긴바나나" && this.PasswordText != "1231"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*똘렝 바드*/
		else if(this.IdText == "똘렝" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 [신방현]개인정보는\n제가 다 가져가겠습니다.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "똘렝" && this.PasswordText != "90909"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*라즈베리단풍 디붕이*/
		else if(this.IdText == "라즈베리단풍" && this.PasswordText == "821212"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n라즈베리초크베리구스베리베리베리 단풍", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "라즈베리단풍" && this.PasswordText != "821212"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*신성범위 스카우터*/
		else if(this.IdText == "신성범위" && this.PasswordText == "1013"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + " 선생님 환영합니다.\n아브렐 버스 부탁드려요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "신성범위" && this.PasswordText != "1013"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*야이빙충아 아르카나*/
		else if(this.IdText == "야이빙충아" && this.PasswordText == "5749"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n템포 따라 오세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "야이빙충아" && this.PasswordText != "5749"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*이밴절리스타 블래스터)*/
		else if(this.IdText == "이밴절리스타" && this.PasswordText == "6757677"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n펼쳐지는 Singing star 너에게 들려질까~", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });

		}
		else if(this.IdText == "이밴절리스타" && this.PasswordText != "6757677"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*HK278 디붕이*/
		else if(this.IdText == "HK278" && this.PasswordText == "0000"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n디붕이는 사랑입니다.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });

		}
		else if(this.IdText == "HK278" && this.PasswordText != "0000"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

        /*뽀야마요 기공사*/
		else if(this.IdText == "뽀야마요" && this.PasswordText == "3920"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n원기옥 원툴 ^^", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "뽀야마요" && this.PasswordText != "3920"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

        /*K여포 창술사*/
		else if(this.IdText == "K여포" && this.PasswordText == "99000"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n코리안 여포 반가워요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "K여포" && this.PasswordText != "99000"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

        /*노마블러드워 홀리나이트*/
		else if(this.IdText == "노마블러드워" && this.PasswordText == "0225"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n서폿은 귀족입니다.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "노마블러드워" && this.PasswordText != "0225"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*피카소테루 도화가*/
		else if(this.IdText == "피카소테루" && this.PasswordText == "2862"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n알카 버리고 도아가로...\n우리 템포좌", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "피카소테루" && this.PasswordText != "2862"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*모쿄건 데빌헌터*/
		else if(this.IdText == "모쿄건" && this.PasswordText == "1293"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n사멸셋 부활!~", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "모쿄건" && this.PasswordText != "1293"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*소서뇽쓰 소서리스*/
		else if(this.IdText == "소서뇽쓰" && this.PasswordText == "3598"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n데둠이 친구 안녕~", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "소서뇽쓰" && this.PasswordText != "3598"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*티거라하오 스카우터*/
		else if(this.IdText == "티거라하오" && this.PasswordText == "69"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n보석이 둘뿐이네?", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "티거라하오" && this.PasswordText != "69"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*명장도화백 도화가*/
		else if(this.IdText == "명장도화백" && this.PasswordText == "11331188"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n도아가로 갈아타신...ㅠ", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "명장도화백" && this.PasswordText != "11331188"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

        /*옥댄버 소서리스*/
		else if(this.IdText == "옥댄버" && this.PasswordText == "09100813"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n 같은 타대수저로 반갑습니다.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "옥댄버" && this.PasswordText != "09100813"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

        /*동쓰알카 아르카나*/
		else if(this.IdText == "동쓰알카" && this.PasswordText == "0230"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n 20대 축하해요 데둠이친구의 아는동생 ㅋㅋ", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "동쓰알카" && this.PasswordText != "0230"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*공초 도화가*/
		else if(this.IdText == "공초" && this.PasswordText == "0105"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n 현질 전 데둠미에게 보고 필수!", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "공초" && this.PasswordText != "0105"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*빛수련 소서리스*/
		else if(this.IdText == "빛수련" && this.PasswordText == "1756"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n 소서리스 너프 시급...너무 강해...요", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "빛수련" && this.PasswordText != "1756"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}


		/*형제뒤에서뭐해요 호크아이*/
		else if(this.IdText == "형제뒤에서뭐해요" && this.PasswordText == "1203"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n워황에서 호크아이로 바꾸셧군요!~", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "형제뒤에서뭐해요" && this.PasswordText != "1203"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*축복영업사원 홀나*/
		else if(this.IdText == "축복영업사원" && this.PasswordText == "20220108"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n홀닥불!~", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "축복영업사원" && this.PasswordText != "20220108"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*들기름모코코무침 홀나*/
		else if(this.IdText == "들기름모코코무침" && this.PasswordText == "8787"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n홀닥불 -> 소서로 변경!~", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "들기름모코코무침" && this.PasswordText != "8787"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*해질녘시티 바드*/
		else if(this.IdText == "해질녘시티" && this.PasswordText == "486456"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n하프가 세상을 구해요", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "해질녘시티" && this.PasswordText != "486456"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*핑후 소서리스*/
		else if(this.IdText == "핑후" && this.PasswordText == "1234"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n같은 타대수저로 반갑습니다.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "핑후" && this.PasswordText != "1234"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*오빠는어디가커 소서리스*/
		else if(this.IdText == "오빠는어디가커" && this.PasswordText == "7724"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n전 다 큰대 ㅎ", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "오빠는어디가커" && this.PasswordText != "7724"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*빠흐흐 서머너*/
		else if(this.IdText == "빠흐흐" && this.PasswordText == "8888"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n마릴린 졸귀....", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "빠흐흐" && this.PasswordText != "8888"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*1월의상태 도화가*/
		else if(this.IdText == "1월의상태" && this.PasswordText == "909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n비밀변호 변경시 문의주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "1월의상태" && this.PasswordText != "909"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*윤시은 소서리스*/
		else if(this.IdText == "윤시은" && this.PasswordText == "909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n비밀변호 변경시 문의주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "윤시은" && this.PasswordText != "909"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*비온계 소서리스*/
		else if(this.IdText == "비온계" && this.PasswordText == "1219"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n절 이기실 때까지 다른곳 못가십니다 고갱님 ^^\n☃️ = 찐따", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "비온계" && this.PasswordText != "1219"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		
		/*아따비 도화가*/
		else if(this.IdText == "아따비" && this.PasswordText == "0225"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n아가..도아가..", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "아따비" && this.PasswordText != "0225"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		
		/*아리아나기갈데 블레이드*/
		else if(this.IdText == "아리아나기갈데" && this.PasswordText == "10329"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n잔재 블레이드 최고..", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "아리아나기갈데" && this.PasswordText != "10329"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		
		/*상콤한가지 창술사*/
		else if(this.IdText == "상콤한가지" && this.PasswordText == "909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n창술..멋져...", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "상콤한가지" && this.PasswordText != "909"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		
		/*남자만좋아해 블래스터*/
		else if(this.IdText == "남자만좋아해" && this.PasswordText == "015401"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n블래스터 휠체어..멋져...", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "남자만좋아해" && this.PasswordText != "015401"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		
		/*흑로남불 스트라이커*/
		else if(this.IdText == "흑로남불" && this.PasswordText == "0716"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n스커..존잘남", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "흑로남불" && this.PasswordText != "0716"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		
		/*수어통역사서기 건슬*/
		else if(this.IdText == "수어통역사서기" && this.PasswordText == "1525"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n건슬 화이팅!", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "수어통역사서기" && this.PasswordText != "1525"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		
		/*장기 미접속*/
		


        /*아만섭*/

		/*산길 홀리나이트(아만)*/
		else if(this.IdText == "산길" && this.PasswordText == "0119"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n홀닥불 타닥~ 타닥~", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "산길" && this.PasswordText != "0119"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*호시하츠 바드(아만)*/
		else if(this.IdText == "호시하츠" && this.PasswordText == "7713"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n킹 갓 제네럴 귀족 바드님 ^^", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "호시하츠" && this.PasswordText != "7713"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*급양반장 아르카나(아만)*/
		else if(this.IdText == "급양반장" && this.PasswordText == "2486"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n빡딜갑니다. 템포 따라 오세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "급양반장" && this.PasswordText != "2486"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*갱뽀 호크아이(아만)*/
		else if(this.IdText == "갱뽀" && this.PasswordText == "2007"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n민국이 아버님 환영해요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "갱뽀" && this.PasswordText != "2007"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*미노르바 홀리나이트(아만)*/
		else if(this.IdText == "미노르바" && this.PasswordText == "7452"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n 홀닥불 > 바드 ㅎㅎ", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "미노르바" && this.PasswordText != "7452"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*지존해완 서머너(아만)*/
		else if(this.IdText == "지존해완" && this.PasswordText == "1212"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n서머너 로웬사기..캐릭터..", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "지존해완" && this.PasswordText != "1212"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*북국너구리  스카우터(아만)*/
		else if(this.IdText == "북국너구리" && this.PasswordText == "3816"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n보석이 둘뿐이네?", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "북국너구리" && this.PasswordText != "3816"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		/*귀찮네이거 소서리스(아만)*/
		else if(this.IdText == "귀찮네이거" && this.PasswordText == "909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n귀찮으시겠지만...\n비밀변호 변경시 문의주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "귀찮네이거" && this.PasswordText != "909"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		
		/*울프람오메가 소서리스(아만)*/
		else if(this.IdText == "울프람오메가" && this.PasswordText == "0225"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n소서리스는 깡...패...", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "울프람오메가" && this.PasswordText != "0225"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		
		/*골든리트리버키운다 도화가(아만)*/
		else if(this.IdText == "골든리트리버키운다" && this.PasswordText == "909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.\n대형 멈머미..체고...", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "골든리트리버키운다" && this.PasswordText != "909"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

        /*휴면계정*/
        /*테스트_계정*/
		else if(this.IdText == "테스트_계정" && this.PasswordText == "950328"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
            this.MatSnackBar.open(this.IdText + "님 환영합니다.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText == "테스트_계정" && this.PasswordText != "950328"){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 확인해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		if(this.IdText == undefined && this.PasswordText == undefined){
            this.MatSnackBar.open("로그인 정보를 입력해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}

		else if(this.IdText == undefined && this.PasswordText != undefined){
             this.MatSnackBar.open("아이디를 선택해주세요.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });
		}
		else if(this.IdText != undefined && this.PasswordText == undefined){
			this.MatSnackBar.open(this.IdText + "님 비밀번호를 입력해주세요.", "확인", {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 3000,
      });
		}

        else{

        }


	}

	UserMenu(MenuName: string){
    if (MenuName == "WeekCalendar") {
      this.IdText = this.route.snapshot.queryParamMap.get("id");
        this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
		$(".mat-drawer-backdrop").click();
		}
    else if (MenuName == 'UserGuide') {
      this.IdText = this.route.snapshot.queryParamMap.get("id");
            this.router.navigate(['/UserGuide'],{queryParams:{id:this.IdText}});
            $(".mat-drawer-backdrop").click();
        }
    else if (MenuName == 'EventNotice') {
      this.IdText = this.route.snapshot.queryParamMap.get("id");
            this.router.navigate(['/EventNotice'],{queryParams:{id:this.IdText}});
            $(".mat-drawer-backdrop").click();
        }
    else if (MenuName == 'UserQnA') {
      this.IdText = this.route.snapshot.queryParamMap.get("id");
            this.router.navigate(['/UserQnA'],{queryParams:{id:this.IdText}});
            $(".mat-drawer-backdrop").click();
        }
	}

	Logout(){

        this.MatSnackBar.open(this.route.snapshot.queryParamMap.get("id") + "님 로그아웃", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });

    this.settings.toggle();
    this.login =false;
    this.router.navigate(['/']);
    setTimeout(()=>{
      location.reload();
    },100)

	}

	darkTheme(){

		if($('.ThemeBtn').hasClass("ThemeBtn_light")) {

			document.body.style.setProperty('--main-background-color',"#555555");
			document.body.style.setProperty('--sub-font-color',"#f5f5f5");
			document.body.style.setProperty('--main-whitefont-color',"#666666");
			document.body.style.setProperty('--maindark-color',"#d290e2");
			document.body.style.setProperty('--subwhite-color',"#a031bc");
			$(".ThemeBtn").removeClass("ThemeBtn_light");
			$(".ThemeBtn").addClass("ThemeBtn_dark");
			}
			else if($('.ThemeBtn').hasClass("ThemeBtn_dark")) {

			document.body.style.setProperty('--main-background-color',"#f5f5f5");
				document.body.style.setProperty('--sub-font-color',"#666666");
				document.body.style.setProperty('--main-whitefont-color',"#eeeeee");
				document.body.style.setProperty('--maindark-color',"#a031bc");
                document.body.style.setProperty('--subwhite-color',"#d7d0e3");
			$(".ThemeBtn").removeClass("ThemeBtn_dark");
			$(".ThemeBtn").addClass("ThemeBtn_light");

			}

	}

  setting(){
    this.userid = this.route.snapshot.queryParamMap.get("id");
    this.settings.toggle();

  }

  User_Guide() {
    const dialogRef = this.dialog.open(UserGuideModalComponent, {
      panelClass: 'Dialog_Defult',
      data: {
      }
    });

	  }

	EventOpen(){
        this.IdText = this.route.snapshot.queryParamMap.get("id");
        this.router.navigate(['/testpage'],{queryParams:{id:this.IdText}});
	}
  reset(){
    var dateArray = ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'];
    dateArray.forEach(async date =>{
      var GeneralArray=[];
      var NormalArray=[];
      var HardalArray=[];
      var EtcArray=[];
      await setDoc(doc(this.firestore, date, "레이드"), {
        "일반" : GeneralArray,
        "노말" : NormalArray,
        "하드" : HardalArray,
        "기타" : EtcArray
      });
      this.settings.toggle();
    });
      this.MatSnackBar.open(this.route.snapshot.queryParamMap.get("id") + "님 주긴 초기화 완료되었습니다.", "확인", {
                horizontalPosition: "center",
                verticalPosition: "top",
                duration: 3000,
              });

  }

}






