import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css'
})
export class GridViewComponent {
  @Input() contacts: Contact[] = [];
  @Output() contactDeleted = new EventEmitter<void>();

  constructor(private contactsService: ContactsService) {}

  deleteContact(contactId: number): void {
    this.contactsService.deleteContact(contactId).subscribe(() => {
      this.contactDeleted.emit(); 
    });
  }
}
