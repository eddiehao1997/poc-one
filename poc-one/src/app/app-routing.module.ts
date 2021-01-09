import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InputFaceComponent } from '../app/input-face/input-face.component';
import { NavibarComponent } from '../app/navibar/navibar.component';
import { WallManagementComponent } from '../app/wall-management/wall-management.component';
import { WindowManagementComponent } from '../app/window-management/window-management.component';
import { DoorManagementComponent } from '../app/door-management/door-management.component';
import { IntroductionComponent } from '../app/introduction/introduction.component';
import { InputHoleComponent } from '../app/input-hole/input-hole.component';

const routes: Routes = 
[
  { path: 'inputFace', component: InputFaceComponent },
  { path: 'input-door-window', component: InputHoleComponent },
  // { path: 'navibar', component: NavibarComponent },
  { path: 'wall-mgmt', component: WallManagementComponent },
  { path: 'window-mgmt', component: WindowManagementComponent },
  { path: 'door-mgmt', component: DoorManagementComponent },
  { path: 'introduction', component: IntroductionComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'introduction' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

