import { Component, computed, inject, resource, signal } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from "@angular/material/list";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  private contactService = inject(ContactService);
  public deleting = signal(false);
  public loading = computed(() => this.contactResource.isLoading() || this.deleting());

  contactResource = resource({
    loader: () => this.contactService.getContactList()
  })

  async deleteContact(id: string) {
    this.deleting.set(true);
    await this.contactService.deleteContact(id);
    this.deleting.set(false);
    this.contactResource.reload();
  }
}
