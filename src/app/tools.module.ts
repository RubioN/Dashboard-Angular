import { ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
// OTHER
import { NgxMaskModule, IConfig } from 'ngx-mask';
// MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

export const options: Partial<null | IConfig> | (() => Partial<null | IConfig>) = null;

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    ClipboardModule,
    // MATERIAL
    MatIconModule,
	MatTooltipModule,
	MatDatepickerModule,
	MatRadioModule,
	MatCheckboxModule,
	MatStepperModule,
	MatSnackBarModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatExpansionModule,
	MatButtonModule,
	MatCardModule,
	MatDividerModule,
	MatListModule,
	MatTabsModule,
	MatSortModule,
	MatMenuModule,
	MatPaginatorModule,
	MatDialogModule,
	MatBadgeModule,
	MatButtonToggleModule,
	MatProgressSpinnerModule,
	MatChipsModule,
	MatMomentDateModule,
	MatTableModule,
	MatProgressBarModule,
	MatRippleModule,
	MatSidenavModule,
	MatAutocompleteModule,
	MatSortModule,
	MatPaginatorModule,
	MatSlideToggleModule,
	MatGridListModule,    
];

const SERVICES: Array<any> = [
]

@NgModule({
    declarations: [],
    imports: [...modules, OverlayModule, NgxMaskModule.forRoot()],
    exports: [...modules, NgxMaskModule],
    providers: [
        ...SERVICES,
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: ['l', 'LL'],
                },
                display: {
                    dateInput: 'L',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY',
                },
            },
        },        
    ]
})
export class ToolsModule {
    static forRoot(): ModuleWithProviders<ToolsModule> {
	    return {
	        ngModule: ToolsModule,
	        providers: [
	            ...SERVICES,
	        ],
	    };
	}
}
