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
  @Input() isModalOpen = false; // Add @Input() to allow binding
  @Output() closeModal = new EventEmitter<void>(); // Add @Output() for the close event

  currentView: 'grid' | 'list' = 'grid';
  contacts: Contact[] = [];

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

  closeModalAndRefresh(): void {
    this.closeModal.emit();
    this.fetchContacts(); 
  }
}
