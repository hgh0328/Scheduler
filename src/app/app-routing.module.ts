import { TestpageComponent } from './testpage/testpage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { EventNoticeComponent } from './event-notice/event-notice.component';
import { UserQnAComponent } from './user-qn-a/user-qn-a.component';


const routes: Routes = [
  { path: 'testpage', component: TestpageComponent },
  { path: 'WeekCalendar', component: WeekCalendarComponent },
  { path: 'UserGuide', component: UserGuideComponent },
  { path: 'EventNotice', component: EventNoticeComponent },
  { path: 'UserQnA', component: UserQnAComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
