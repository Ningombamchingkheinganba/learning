import { Component, inject, resource } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../model/contact';
import { MatListModule } from "@angular/material/list";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  private contactService = inject(ContactService);

  public contactResource = resource({
    loader: () => this.contactService.getContactList()
  })

  async deleteContact(id: string) {
    this.contactService.deleteContact(id);
    this.contactResource.reload();
  }
}
