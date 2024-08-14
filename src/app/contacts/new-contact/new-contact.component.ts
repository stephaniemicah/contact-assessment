import { Component, DestroyRef, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
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
  private destroyRef = inject(DestroyRef);
  @Input() contactToEdit: Contact | null = null;
  @Output() cancel = new EventEmitter<void>();
  @Output() contactAdded = new EventEmitter<void>();

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });

  constructor(private contactsService: ContactsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactToEdit'] && this.contactToEdit) {
      this.contactForm.patchValue({
        name: this.contactToEdit.name,
        contactNumber: this.contactToEdit.phone, // Ensure this matches the form control name
        email: this.contactToEdit.email
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      console.log('INVALID FORM');
      return;
    }

    if (this.contactToEdit) {
      // Update existing contact
      const updatedContact: Contact = {
        ...this.contactToEdit,
        name: this.contactForm.value.name ?? '',
        phone: this.contactForm.value.contactNumber ?? '',
        email: this.contactForm.value.email ?? '',
      };

      const subscription = this.contactsService.updateContact(updatedContact).subscribe(() => {
        this.contactAdded.emit();
      });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    } else {
      // Add new contact
      const subscription = this.contactsService.getContacts().subscribe((contacts) => {
        const maxId = contacts.length > 0 ? Math.max(...contacts.map(contact => parseInt(contact.id, 10))) : 0;

        const newContact: Contact = {
          id: (maxId + 1).toString(), // Use string ID
          name: this.contactForm.value.name ?? '',
          phone: this.contactForm.value.contactNumber ?? '',
          email: this.contactForm.value.email ?? '',
        };

        this.contactsService.addContact(newContact).subscribe(() => {
          this.contactAdded.emit();
        });
      });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
  }



  cancelModal(): void {
    this.cancel.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
}
