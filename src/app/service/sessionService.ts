import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private MatSnackBar: MatSnackBar,
    private router:Router) { }

  setInfo(userId) {
    sessionStorage.setItem('id', userId);
  }

  getInfo(){
    return sessionStorage.getItem('id');
  }

  setAuth(menuAuth){
    sessionStorage.setItem('menuAuth', menuAuth);
  }

  getAuth(){
    return sessionStorage.getItem('menuAuth');
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/']);
      this.MatSnackBar.open('로그아웃 되었습니다.', "확인", {
                    horizontalPosition: "center",
                    verticalPosition: "top",
                    duration: 3000,
                  });
  }
}
