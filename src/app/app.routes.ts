import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ViewContactComponent } from './contacts/view-contact/view-contact.component';

export const routes: Routes = [
  {
    path: 'home',
    component: ContactsComponent
  },
  {
    path: 'view-contact/:id',
    component: ViewContactComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
