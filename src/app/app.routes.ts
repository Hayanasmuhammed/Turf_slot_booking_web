import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SlotCardComponent } from './components/slot-card/slot-card.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  { path: 'login', component: LoginComponent },

  { path: 'slot_book', component: SlotCardComponent }
  
];
