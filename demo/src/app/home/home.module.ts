import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  SnpModule  } from 'simple-ngx-policy';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        SnpModule.forRoot(),
        HomeRoutingModule,
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
