import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'http://localhost:3000/contacts';

  constructor(private httpClient: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.apiUrl);
  }

  getContactById(id: string): Observable<Contact> { // Changed to string
    return this.httpClient.get<Contact>(`${this.apiUrl}/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(this.apiUrl, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(`${this.apiUrl}/${contact.id}`, contact);
  }

  deleteContact(id: string): Observable<Contact> { // Changed to string
    return this.httpClient.delete<Contact>(`${this.apiUrl}/${id}`);
  }
}
