import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

const modules = [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
];

@NgModule({
    declarations: [],
    imports: [...modules],
    exports: [...modules],
    providers: [],
})
export class CoreModule {
    constructor(
        @SkipSelf() @Optional() coreModule: CoreModule,
    ) {
        if (coreModule) {
            throw new Error('CoreModule has to be imported only once in AppModule.');
        }
    }
}