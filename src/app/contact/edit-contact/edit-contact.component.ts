import { Component, inject, input, linkedSignal, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { ContactService } from '../../service/contact.service';

@Component({
  selector: 'app-edit-contact',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, FormsModule, MatProgressSpinnerModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent {

  editing = signal(false);
  router = inject(Router);

  id = input.required<string>();
  contactService = inject(ContactService);

  contactResource = resource({
    request: this.id,
    loader: ({ request: id }) => this.contactService.getContactById(id)
  })

  name = linkedSignal(() => this.contactResource.value()?.name ?? "");
  email = linkedSignal(() => this.contactResource.value()?.email ?? "");
  phoneNumber = linkedSignal(() => this.contactResource.value()?.phoneNumber ?? "");

  async edit() {
    this.editing.set(true)
    await this.contactService.editContact({
      id: this.id(),
      name: this.name(),
      email: this.email(),
      phoneNumber: this.phoneNumber()
    })
    this.editing.set(false);
    this.router.navigate(["/"]);
  }
}
