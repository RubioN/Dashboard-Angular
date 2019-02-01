import { NgModule } from '@angular/core';
import { MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    CalendarComponent
  ],
  declarations : [
    CalendarComponent
  ],
  providers: [ MatDatepickerModule ]
})

export class MaterialModule {}