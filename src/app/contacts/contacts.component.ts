import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { GridViewComponent } from './grid-view/grid-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, GridViewComponent, ListViewComponent, NewContactComponent, HttpClientModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() isModalOpen = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  currentView: 'grid' | 'list' = 'grid';
  contacts: Contact[] = [];
  contactToEdit: Contact | null = null;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.fetchContacts();
  }

  setView(view: 'grid' | 'list'): void {
    this.currentView = view;
  }

  fetchContacts(): void {
    this.contactsService.getContacts().subscribe((data) => {
      this.contacts = data;
    });
  }

  openModal(): void {
    this.contactToEdit = null; // Ensure no contact is being edited
    this.isModalOpen = true;   // Open the modal for adding a new contact
  }

  openModalForEdit(contact: Contact): void {
    this.contactToEdit = contact;
    this.isModalOpen = true;
  }

  closeModalAndRefresh(): void {
    this.isModalOpen = false;
    this.fetchContacts();
    this.contactToEdit = null;
  }

  // Consolidated closeModal method
  closeModal(): void {
    this.isModalOpen = false;
    this.contactToEdit = null;
    this.closeModalEvent.emit(); 
  }
}
