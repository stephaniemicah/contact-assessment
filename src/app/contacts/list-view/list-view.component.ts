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
export class ListViewComponent implements OnInit{
  @Input() contacts: any[] = [];
  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.fetchContacts();
  }

  fetchContacts(): void {
    this.contactsService.getContacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
}
