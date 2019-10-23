import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomePageModule'
      },
      {
        path: ':id',
        component: VideoDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CommonModule, IonicModule
  ],
  exports: [RouterModule],
  declarations: [VideoDetailComponent]
})
export class AppRoutingModule {}
