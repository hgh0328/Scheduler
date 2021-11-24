import { Component, Output, ViewChild,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import * as $ from 'jquery';
import { MatSidenav } from '@angular/material/sidenav';
import { doc } from '@firebase/firestore';
import { Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import { UserGuideModalComponent } from './user-guide-modal/user-guide-modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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


  constructor(
    private MatBottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore,
  ){}
	ngOnInit(): void {



    if (window.location.href.indexOf("id") != -1) {
      this.IdText = this.route.snapshot.queryParamMap.get("id");
        this.login =true
        $(".Main_PanelBox").fadeIn(300);
      }
          else{
        this.login = false;
        $(".Main_PanelBox").fadeOut(300);
      this.router.navigate(['/']);
      window.alert("로그인을 다시 시도해 주세요.");
      }
    }

	Login(){
		if(this.IdText == "점화걸면정화" && this.PasswordText == "3280"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			$(".Main_SettingButtonBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");

		}
		else if(this.IdText == "점화걸면정화" && this.PasswordText != "3280"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}
		else if(this.IdText == "데둠미" && this.PasswordText == "8418"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			$(".Main_SettingButtonBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + " 데둠배 빵빵이 부헤헤 안뇽 방가워");
		}
		else if(this.IdText == "데둠미" && this.PasswordText != "8418"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*유저 목록 현재 1 ~ 13명 카톡 프로필 순 카단 ~ 아만 순*/

		/*카단섭*/
		/*펭난나 서머너*/
		else if(this.IdText == "펭난나" && this.PasswordText == "951215"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n환상의 나라 에~버~랜드");
		}
		else if(this.IdText == "펭난나" && this.PasswordText != "951215"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*블군자 블래스터*/
		else if(this.IdText == "블군자" && this.PasswordText == "363652"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n휠체어 어르신");
		}
		else if(this.IdText == "블군자" && this.PasswordText != "363652"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*욕망군단장형아키스 소서리스*/
		else if(this.IdText == "욕망군단장형아키스" && this.PasswordText == "1234"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n언니 나 죽어");
		}
		else if(this.IdText == "욕망군단장형아키스" && this.PasswordText != "1234"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*인조인간91호*/
		else if(this.IdText == "인조인간91호" && this.PasswordText == "28452600"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n인조인간~로보트~");
		}
		else if(this.IdText == "인조인간91호" && this.PasswordText != "28452600"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*긴바나나 소서리스*/
		else if(this.IdText == "긴바나나" && this.PasswordText == "1231"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n이태원바나나는 제겁니다.");
		}
		else if(this.IdText == "긴바나나" && this.PasswordText != "1231"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*똘렝 바드*/
		else if(this.IdText == "똘렝" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 [신방현]개인정보는\n제가 다 가져가겠습니다.");
		}
		else if(this.IdText == "똘렝" && this.PasswordText != "90909"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*라즈베리단풍 디붕이*/
		else if(this.IdText == "라즈베리단풍" && this.PasswordText == "821212"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n라즈베리초크베리구스베리베리베리 단풍");
		}
		else if(this.IdText == "라즈베리단풍" && this.PasswordText != "821212"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*식끈박끈 홀나*/
		else if(this.IdText == "식끈박끈" && this.PasswordText == "123456"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n같이 레이드 돌고 놀아요~");
		}
		else if(this.IdText == "식끈박끈" && this.PasswordText != "123456"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*신성범위 스카우터*/
		else if(this.IdText == "신성범위" && this.PasswordText == "1013"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + " 선생님 환영합니다.\n아브렐 버스 부탁드려요.");
		}
		else if(this.IdText == "신성범위" && this.PasswordText != "1013"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*하얀활 호크아이*/
		else if(this.IdText == "하얀활" && this.PasswordText == "9559"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n건슬은 너프 안될겁니다.");
		}
		else if(this.IdText == "하얀활" && this.PasswordText != "9559"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*HK278 디붕이*/
		else if(this.IdText == "HK278" && this.PasswordText == "0000"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n디붕이는 사랑입니다.");

		}
		else if(this.IdText == "HK278" && this.PasswordText != "0000"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

        /*뽀야마요 기공사*/
		else if(this.IdText == "뽀야마요" && this.PasswordText == "3920"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n원기옥 원툴 ^^");
		}
		else if(this.IdText == "뽀야마요" && this.PasswordText != "3920"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

        /*K여포 창술사*/
		else if(this.IdText == "K여포" && this.PasswordText == "99000"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n코리안 여포 반가워요.");
		}
		else if(this.IdText == "K여포" && this.PasswordText != "99000"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}
        
        /*노마블러드워 홀리나이트*/
		else if(this.IdText == "노마블러드워" && this.PasswordText == "0225"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n서폿은 귀족입니다.");
		}
		else if(this.IdText == "노마블러드워" && this.PasswordText != "0225"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}
        

        /*아만섭*/
		/*나긋하 바드*/
		else if(this.IdText == "나긋하" && this.PasswordText == "3161017"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n군장 검사 행정 보급관");
		}
		else if(this.IdText == "나긋하" && this.PasswordText != "3161017"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*야이빙충아 아르카나*/
		else if(this.IdText == "야이빙충아" && this.PasswordText == "5749"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n로아 사랑꾼 ♥️ ❤");
		}
		else if(this.IdText == "야이빙충아" && this.PasswordText != "5749"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

		/*이밴절리스타 블래스터(아브렐슈드)*/
		else if(this.IdText == "이밴절리스타" && this.PasswordText == "0704"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.\n펼쳐지는 Singing star 너에게 들려질까~");
		}
		else if(this.IdText == "이밴절리스타" && this.PasswordText != "0704"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}

        /*휴면계정*/
        /*달빛천사썬가드 소서리스*/
		else if(this.IdText == "달빛천사썬가드" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}
		else if(this.IdText == "달빛천사썬가드" && this.PasswordText != "90909"){
			window.alert(this.IdText + "님 비밀번호를 확인해주세요.");
		}


		if(this.IdText == undefined && this.PasswordText == undefined){
			window.alert("로그인 정보를 입력해주세요.");
		}

		else if(this.IdText == undefined && this.PasswordText != undefined){
			window.alert("아이디를 선택해주세요.");
		}
		else if(this.IdText != undefined && this.PasswordText == undefined){
			window.alert(this.IdText + "님 비밀번호를 입력해주세요.");
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

    window.alert(this.route.snapshot.queryParamMap.get("id") + "님 로그아웃");

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
      panelClass: 'UserGuide_Dialog',
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
      window.alert(this.route.snapshot.queryParamMap.get("id") + "님 주긴 초기화 완료되었습니다.");

  }

}






