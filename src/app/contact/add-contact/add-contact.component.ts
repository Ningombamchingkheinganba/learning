import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input"
import { Router, RouterLink } from '@angular/router';
import { ContactService } from '../../service/contact.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-contact',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, FormsModule, MatProgressSpinnerModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

  saving = signal(false);
  contactService = inject(ContactService);
  router = inject(Router);

  name = signal("");
  email = signal("");
  phoneNumber = signal("");

  async save() {
    this.saving.set(true);
    await this.contactService.addContact(this.name(), this.email(), this.phoneNumber());
    this.saving.set(false);
    this.router.navigate(["/"]);
  }

}
