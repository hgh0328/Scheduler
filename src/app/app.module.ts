import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Angular Meterial
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabGroupGestureModule } from '@angular-material-gesture/mat-tab-group-gesture';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { MyHorkWrokCheckListComponent } from './my-hork-wrok-check-list/my-hork-wrok-check-list.component';
import {MatSortModule} from '@angular/material/sort';
import { AddCharacterDialogComponent } from './add-character-dialog/add-character-dialog.component';
import { RemoveCharacterDialogComponent } from './remove-character-dialog/remove-character-dialog.component';
import { ModifyCharacterDialogComponent } from './modify-character-dialog/modify-character-dialog.component';
import { AllWeekResetDialogComponent } from './all-week-reset-dialog/all-week-reset-dialog.component';
import { WeekResetDialogComponent } from './week-reset-dialog/week-reset-dialog.component';
import { CharacterAddCalendarDialogComponent } from './character-add-calendar-dialog/character-add-calendar-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

/*CDK Module*/
import {TextFieldModule} from '@angular/cdk/text-field';




// ngrx 관련
import {EffectsModule} from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {reducers, metaReducers} from './store'
import { StoreEffects } from './store/effects/effect'
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

/*페이지*/
import { TestpageComponent } from './testpage/testpage.component';
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { CalendarAddButtonComponent } from './calendar-add-button/calendar-add-button.component';
import { EventNoticeComponent } from './event-notice/event-notice.component';
import { UserQnAComponent } from './user-qn-a/user-qn-a.component';
import { UserGuideComponent } from './user-guide/user-guide.component';
import { UserGuideModalComponent } from './user-guide-modal/user-guide-modal.component';

// firebase 관련
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';










@NgModule({
  declarations: [
    AppComponent,
    TestpageComponent,
    WeekCalendarComponent,
    CalendarAddButtonComponent,
    UserGuideComponent,
    EventNoticeComponent,
    UserQnAComponent,
    UserGuideModalComponent,
    MyHorkWrokCheckListComponent,
    AddCharacterDialogComponent,
    RemoveCharacterDialogComponent,
    ModifyCharacterDialogComponent,
    WeekResetDialogComponent,
    AllWeekResetDialogComponent,
    CharacterAddCalendarDialogComponent,

  ],
  imports: [
    MatTabGroupGestureModule,
    MatSnackBarModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    TextFieldModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatDialogModule,
	MatProgressBarModule,
	  MatSortModule,
	  NgxMatSelectSearchModule,
	  MatAutocompleteModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    //EffectsModule.forFeature([StoreEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
