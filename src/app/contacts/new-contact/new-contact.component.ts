import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent {
  @Output() cancel = new EventEmitter<void>();

  contact: Contact = {
    id: 0,
    name: '',
    email: '',
    phone: ''
  };

  constructor(private contactsService: ContactsService) {}

  saveContact(): void {
    this.contactsService.addContact(this.contact).subscribe(() => {
      // Handle success, e.g., close modal or refresh contact list
    });
  }

  cancelModal(): void {
    // Logic to close the modal
    this.cancel.emit();
  }
}
