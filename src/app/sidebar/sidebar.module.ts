import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from '../material.module';

@NgModule({
    imports: [RouterModule, CommonModule, MaterialModule],
    declarations: [SidebarComponent],
    exports: [SidebarComponent]
})

export class SidebarModule { }
