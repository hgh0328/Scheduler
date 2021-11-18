import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import * as $ from 'jquery';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public IdText: any;
  public PasswordText: any;

  title = 'LOSTARK_Scheduler_by_JH';
  hide = true;
  hide2 = true;
  hide3 = true;
  showFiller = false;



  constructor(
	private MatBottomSheet: MatBottomSheet,
    private router: Router,

  ){}
	ngOnInit(): void {
		
		this.router.navigate(['/WeekCalendar']);

    }

	Login(){
		var t = this.IdText;
		$(".Main_Setting_User span").text(t);
		
		if(this.IdText == "점화걸면정화" && this.PasswordText == "1234"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			$(".Main_SettingButtonBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);
		}
		else if(this.IdText == "데둠미" && this.PasswordText == "84183280"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			$(".Main_SettingButtonBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		/*유저 목록 현재 1 ~ 13명 카톡 프로필 순 아만 ~ 카단 순*/
		
		/*아만섭*/
		
		/*나긋하 바드*/
		else if(this.IdText == "나긋하" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*카단섭*/
		
		/*펭난나 서머너*/
		else if(this.IdText == "펭난나" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*달빛천사썬가드 소서리스*/
		else if(this.IdText == "달빛천사썬가드" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*블군자 블래스터*/
		else if(this.IdText == "블군자" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*욕망군단장형아키스 소서리스*/
		else if(this.IdText == "욕망군단장형아키스" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*인조인간91호*/
		else if(this.IdText == "인조인간91호" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*긴바나나 소서리스*/
		else if(this.IdText == "긴바나나" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*똘렝 바드*/
		else if(this.IdText == "똘렝" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*라즈베리단풍 디붕이*/
		else if(this.IdText == "라즈베리단풍" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*식끈박끈 홀나*/
		else if(this.IdText == "식끈박끈" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*신성범위 스카우터*/
		else if(this.IdText == "신성범위" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*하얀활 호크아이*/
		else if(this.IdText == "하얀활" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}
		
		/*HK278 디붕이*/
		else if(this.IdText == "HK278" && this.PasswordText == "90909"){
			$(".Login_Box").fadeOut(500);
			$(".Main_PanelBox").fadeIn(300);
			this.router.navigate(['/WeekCalendar']);			
		}

	}

	UserMenu(MenuName: string){
		if(MenuName == "WeekCalendar"){
		this.router.navigate(['/WeekCalendar']);
		$(".mat-drawer-backdrop").click();
		}
	}
	
	Logout(){
		location.reload();
	}
	darkTheme(){
		
		if($('.ThemeBtn').hasClass("ThemeBtn_light")) {

			document.body.style.setProperty('--main-background-color',"#555555");
			document.body.style.setProperty('--sub-font-color',"#f5f5f5");
			document.body.style.setProperty('--main-whitefont-color',"#999999");
			document.body.style.setProperty('--maindark-color',"#d290e2");
			$(".ThemeBtn").removeClass("ThemeBtn_light");
			$(".ThemeBtn").addClass("ThemeBtn_dark");
			console.log("어두운테마");
			}
			else if($('.ThemeBtn').hasClass("ThemeBtn_dark")) {

			document.body.style.setProperty('--main-background-color',"#f5f5f5");
				document.body.style.setProperty('--sub-font-color',"#666666");
				document.body.style.setProperty('--main-whitefont-color',"#eeeeee");
				document.body.style.setProperty('--maindark-color',"#a031bc");
			$(".ThemeBtn").removeClass("ThemeBtn_dark");
			$(".ThemeBtn").addClass("ThemeBtn_light");	
			console.log("밝은테마");
			}
	
	}

}






