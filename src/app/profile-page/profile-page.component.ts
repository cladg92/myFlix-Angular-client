import { Component, OnInit } from '@angular/core';

import { UpdatePageComponent } from '../update-page/update-page.component';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  favMovies: any[] = [];
  username: any;
  email: any;
  birthday: any;
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Gets user info from the backend
   * @returns username, email, birthday, favorite movies array
   */
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      this.username = resp.Username;
      this.email = resp.Email;
      this.birthday = resp.BirthDate;
      return this.favMovies, this.email, this.username, this.birthday;
    });
  }

  /**
   * Opens dialog to display the UpdatePageComponent when the update button is clicked
   */
  openUpdateDialog(): void {
    this.dialog.open(UpdatePageComponent, {
      // Assigning the dialog a width
      width: '500px',
    });
  }

  /**
   * Removes movie from user's favorites by making a delete request to the backend
   */
  removeFavorites(movieID: string): void {
    this.fetchApiData.deleteFavMovies(movieID).subscribe((resp: any) => {
      console.log(resp);
      this.ngOnInit();
    });
  }
}
