import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IProfile } from '../../../shared/models/profile-response.module';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  public currentUser$!: Observable<IProfile>;
  public isEditingName = false;
  public isEditingEmail = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.currentUser$ = this.profileService.getUserInfo();
  }

  public toggleEditName(): void {
    this.isEditingName = !this.isEditingName;
  }

  public toggleEditEmail(): void {
    this.isEditingEmail = !this.isEditingEmail;
  }
}
