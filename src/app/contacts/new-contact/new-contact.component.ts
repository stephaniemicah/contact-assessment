import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() contactAdded = new EventEmitter<void>();

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/) // Regex to ensure exactly 11 digits
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });

  constructor(private contactsService: ContactsService) {}

  onSubmit(): void {
    if (this.contactForm.invalid) {
      console.log('INVALID FORM');
      return;
    }

    const newContact: Contact = {
      id: 0,
      name: this.contactForm.value.name ?? '',
      phone: this.contactForm.value.contactNumber ?? '',
      email: this.contactForm.value.email ?? '',
    };

    this.contactsService.addContact(newContact).subscribe(() => {
      this.contactAdded.emit();
    });
  }

  cancelModal(): void {
    this.cancel.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
