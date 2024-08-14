import { Component, Input, OnInit } from '@angular/core';
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

  }


