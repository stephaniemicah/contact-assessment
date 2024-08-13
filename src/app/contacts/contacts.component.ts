import { Component, OnInit } from '@angular/core';
import { ContactsService } from './contacts.service';
import { GridViewComponent } from './grid-view/grid-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, GridViewComponent, ListViewComponent, HttpClientModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  currentView: 'grid' | 'list' = 'grid';

  setView(view: 'grid' | 'list'): void {
    this.currentView = view;
  }
}
