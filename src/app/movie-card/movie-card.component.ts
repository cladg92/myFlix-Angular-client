import { Component, OnInit } from '@angular/core';

import { GenrePageComponent } from '../genre-page/genre-page.component';
import { DirectorPageComponent } from '../director-page/director-page.component';
import { DescriptionPageComponent } from '../description-page/description-page.component';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favMoviesIDs: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  /**
   * Runs getMovies and getFavMoviesIDs methods when the component is initialized
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavMoviesIDs();
  }

  /**
   * Gets list of all movies from the backend
   * @returns array of movies objects
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Gets list of all favorite movies from the backend
   * @returns array of favorite movies IDs
   */
  getFavMoviesIDs(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMoviesIDs = resp.FavoriteMovies.map(
        (m: { _id: string }) => m._id
      );
      console.log(this.favMoviesIDs);
      return this.favMoviesIDs;
    });
  }

  /**
   * Checks whether a movie is already included in the favorites
   * @returns boolean
   */
  isFav(id: string): boolean {
    return this.favMoviesIDs.includes(id);
  }

  /**
   * Navigates to profile page
   */
  getProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Opens dialog to display the GenrePageComponent when the genre button is clicked
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenrePageComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assigning the dialog a width
      width: '500px',
    });
  }

  /**
   * Opens dialog to display the DirectorPageComponent when the director button is clicked
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorPageComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      // Assigning the dialog a width
      width: '500px',
    });
  }

  /**
   * Opens dialog to display the DescriptionPageComponent when the synopsis button is clicked
   */
  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(DescriptionPageComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // Assigning the dialog a width
      width: '500px',
    });
  }

  /**
   * Adds movie to the user's favorites by making a post request in the backend
   */
  addFavorites(movieID: string): void {
    this.fetchApiData.addFavMovies(movieID).subscribe((resp: any) => {
      console.log(resp);
      this.ngOnInit();
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
