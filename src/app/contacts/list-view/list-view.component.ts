import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {
  @Input() contacts: any[] = [];
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
