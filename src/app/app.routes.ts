import { Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ViewContactComponent } from './contacts/view-contact/view-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
  },
  {
    path: '**', 
    component: PageNotFoundComponent
  }
];
