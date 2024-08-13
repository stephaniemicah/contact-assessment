import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactsService } from './contacts.service';
import { GridViewComponent } from './grid-view/grid-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewContactComponent } from "./new-contact/new-contact.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, GridViewComponent, ListViewComponent, HttpClientModule, NewContactComponent, HeaderComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  @Input() isModalOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  currentView: 'grid' | 'list' = 'grid';

  setView(view: 'grid' | 'list'): void {
    this.currentView = view;
  }

  closeModalAndReset(): void {
    this.closeModal.emit();
  }
}
