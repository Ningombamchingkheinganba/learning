import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, FormsModule, MatProgressSpinnerModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent {

  editing = signal(false);

  name = signal("");
  email = signal("");
  phoneNumber = signal("");

  edit() {
    
  }

}
