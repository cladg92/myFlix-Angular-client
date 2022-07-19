import { Component, OnInit } from '@angular/core';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  favMovies: any[] = [];
  username: any;
  email: any;
  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  // create function to get user info
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      this.username = resp.Username;
      this.email = resp.Email;
      return this.favMovies, this.email, this.username;
    });
  }
}
