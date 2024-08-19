import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IProfile } from '../../../shared/models/profile-response.module';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  public currentUser!: IProfile;
  public isEditingName = false;
  public isEditingEmail = false;
  public editNameInput = new FormControl<string | null>('');
  public editEmailInput = new FormControl<string | null>('');

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getUserInfo().subscribe(user => {
      this.currentUser = user;
      this.editNameInput.setValue(this.currentUser.name ?? 'User');
      this.editEmailInput.setValue(this.currentUser.email);
    });
  }

  public toggleEditName(): void {
    this.isEditingName = !this.isEditingName;
  }

  public toggleEditEmail(): void {
    this.isEditingEmail = !this.isEditingEmail;
  }

  saveName() {
    const name = this.editNameInput.value?.trim();
    const { email } = this.currentUser;

    if (!name || !email) return;

    this.profileService.updateUserInfo(name, email).subscribe(() => {
      this.currentUser.name = name;
      this.isEditingName = false;
    });
  }

  saveEmail() {
    const { name } = this.currentUser;
    const email = this.editEmailInput.value?.trim();

    if (!name || !email) return;

    this.profileService.updateUserInfo(name, email).subscribe(() => {
      this.currentUser.email = email;
      this.isEditingEmail = false;
    });
  }
}
