import { Routes } from '@angular/router';
import { ContactListComponent } from './contact/contact-list/contact-list.component';

export const routes: Routes = [
    {
        path: "",
        component: ContactListComponent,
        pathMatch: 'full'
    }
];
