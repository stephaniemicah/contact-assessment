import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {
  @Input() contacts: any[] = [];
 
}
