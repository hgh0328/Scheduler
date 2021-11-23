import { TestpageComponent } from './testpage/testpage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { EventNoticeComponent } from './event-notice/event-notice.component';


const routes: Routes = [
  { path: 'testpage', component: TestpageComponent },
  { path: 'WeekCalendar', component: WeekCalendarComponent },
  { path: 'UserGuide', component: UserGuideComponent },
  { path: 'EventNotice', component: EventNoticeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
