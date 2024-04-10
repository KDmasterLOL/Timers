import { Routes } from '@angular/router';
import { AboutComponent } from 'pages/about/about.component';
import { IndexComponent } from 'pages/index/index.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'about', component: AboutComponent },
];
