import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../contacts.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css'
})
export class GridViewComponent {
  @Input() contacts: Contact[] = [];
  @Output() contactDeleted = new EventEmitter<void>();
  @Output() editContact = new EventEmitter<Contact>();

  constructor(private contactsService: ContactsService) {}

  onEdit(contact: Contact): void {
    this.editContact.emit(contact);
  }

  deleteContact(contactId: string): void {
    this.contactsService.deleteContact(contactId).subscribe(() => {
      this.contactDeleted.emit(); // Notify the parent component to refresh the contact list
    });
  }
}
