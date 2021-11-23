import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestpageComponent } from './testpage/testpage.component';


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


/*CDK Module*/
import {TextFieldModule} from '@angular/cdk/text-field';




// ngrx 관련
import {EffectsModule} from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {reducers, metaReducers} from './store'
import { StoreEffects } from './store/effects/effect'
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

/*페이지*/
import { WeekCalendarComponent } from './week-calendar/week-calendar.component';
import { CalendarAddButtonComponent } from './calendar-add-button/calendar-add-button.component';

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

  ],
  imports: [
    MatTabGroupGestureModule,
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
	MatProgressBarModule,
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
