import { Routes } from '@angular/router';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';

export const routes: Routes = [
    {
        path: "",
        component: ContactListComponent,
        pathMatch: 'full'
    },
    {
        path: "add",
        component: AddContactComponent
    },
    {
        path: "edit/:id",
        component: EditContactComponent
    }
];
