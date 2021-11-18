import { TestpageComponent } from './testpage/testpage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';


const routes: Routes = [
  { path: 'testpage', component: TestpageComponent },
  { path: 'WeekCalendar', component: WeekCalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
