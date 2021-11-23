import { Component, Output, ViewChild,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import * as $ from 'jquery';
import { MatSidenav } from '@angular/material/sidenav';
import { doc } from '@firebase/firestore';
import { Firestore, getDoc, setDoc } from '@angular/fire/firestore';



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


  constructor(
	private MatBottomSheet: MatBottomSheet,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: Firestore,
  ){}
	ngOnInit(): void {

		$("#PasswordInput").bind('keydown', function(e){
		if(e.keyCode === 13){


		}
		})


      if(window.location.href.indexOf("id") != -1){
        this.login =true
        $(".Main_PanelBox").fadeIn(300);
      }else{
        this.login = false;

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
		else if(this.IdText == "데둠미" && this.PasswordText == "8418"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			$(".Main_SettingButtonBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + " 데둠배 빵빵이 부헤헤 안뇽");
		}
		/*유저 목록 현재 1 ~ 13명 카톡 프로필 순 아만 ~ 카단 순*/

		/*아만섭*/

		/*나긋하 바드*/
		else if(this.IdText == "나긋하" && this.PasswordText == "3161017"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}
		
		/*야이빙충아 아르카나*/
		else if(this.IdText == "야이빙충아" && this.PasswordText == "5749"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}
		
		/*이밴절리스타 블래스터(아브렐슈드)*/
		else if(this.IdText == "이밴절리스타" && this.PasswordText == "0704"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*카단섭*/

		/*펭난나 서머너*/
		else if(this.IdText == "펭난나" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*달빛천사썬가드 소서리스*/
		else if(this.IdText == "달빛천사썬가드" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*블군자 블래스터*/
		else if(this.IdText == "블군자" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*욕망군단장형아키스 소서리스*/
		else if(this.IdText == "욕망군단장형아키스" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*인조인간91호*/
		else if(this.IdText == "인조인간91호" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*긴바나나 소서리스*/
		else if(this.IdText == "긴바나나" && this.PasswordText == "1231"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*똘렝 바드*/
		else if(this.IdText == "똘렝" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 [신방현]개인정보는 제가 다 가져가겠습니다. 감사합니다.");
		}

		/*라즈베리단풍 디붕이*/
		else if(this.IdText == "라즈베리단풍" && this.PasswordText == "821212"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*식끈박끈 홀나*/
		else if(this.IdText == "식끈박끈" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*신성범위 스카우터*/
		else if(this.IdText == "신성범위" && this.PasswordText == "1013"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*하얀활 호크아이*/
		else if(this.IdText == "하얀활" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");
		}

		/*HK278 디붕이*/
		else if(this.IdText == "HK278" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar'],{queryParams:{id:this.IdText}});
			window.alert(this.IdText + "님 환영합니다.");

		}
//		else{
//			window.alert("로그인 정보가 존재하지 않습니다.");
//		};

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
		if(MenuName == "WeekCalendar"){
		this.router.navigate(['/WeekCalendar']);
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
	EventOpen(){
		this.router.navigate(['/testpage']);
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
    })
      window.alert(this.route.snapshot.queryParamMap.get("id") + "님 주긴 초기화 완료되었습니다.");

  }

}






