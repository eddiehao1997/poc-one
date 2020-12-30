import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFaceComponent } from './input-face/input-face.component';
import { NavibarComponent } from './navibar/navibar.component';
import { WallManagementComponent } from './wall-management/wall-management.component';
import { WindowManagementComponent } from './window-management/window-management.component';
import { DoorManagementComponent } from './door-management/door-management.component';
import { IntroductionComponent } from './introduction/introduction.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFaceComponent,
    NavibarComponent,
    WallManagementComponent,
    WindowManagementComponent,
    DoorManagementComponent,
    IntroductionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
