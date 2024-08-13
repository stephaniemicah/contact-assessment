import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() openNewContactModal = new EventEmitter<void>();

  openModal(): void {
    this.openNewContactModal.emit();
  }
}
