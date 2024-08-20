import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.scss',
})
export class ProfileModalComponent {
  public isHoveredPassword: boolean = false;
  public editPasswordInput = new FormControl<string | null>('');

  @Input() public isPasswordModalOpen: boolean = false;
  @Output() public closeModal = new EventEmitter<void>();

  constructor(private profileService: ProfileService) {}

  public changePassword(): void {
    const password = this.editPasswordInput.value?.trim();

    if (!password) return;

    this.profileService.changePassword(password).subscribe(() => {
      this.editPasswordInput.setValue('');
      this.close();
    });
  }

  public isPassLengthValid(): boolean {
    const password = this.editPasswordInput.value?.trim();

    return password ? password.length >= 8 : false;
  }

  public close(): void {
    this.closeModal.emit();
  }
}
