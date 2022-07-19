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
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  // runs when component is initialized(mounted)
  ngOnInit(): void {
    this.getMovies();
  }

  // create function to get all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // create function to redirect to profile page
  getProfile(): void {
    this.router.navigate(['profile']);
  }

  // create function to get genre dialog
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

  // create function to get director dialog
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

  // create function to get description dialog
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

  // create function to add to favorites
  addFavorites(movieID: string): void {
    this.fetchApiData.addFavMovies(movieID).subscribe((resp: any) => {
      console.log(resp);
    });
  }
}
