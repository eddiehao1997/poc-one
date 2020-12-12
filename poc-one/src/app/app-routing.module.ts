import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InputFaceComponent } from '../app/input-face/input-face.component';

const routes: Routes = 
[
  { path: 'inputFace', component: InputFaceComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'inputFace' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

