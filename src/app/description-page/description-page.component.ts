import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description-page',
  templateUrl: './description-page.component.html',
  styleUrls: ['./description-page.component.scss'],
})
/**
 * Injects data from the MovieCard component using the MAT_DIALOG_DATA injection token.
 * The data can be accessed to populate the view.
 * @param data
 */
export class DescriptionPageComponent implements OnInit {
  constructor(
    /**
     * Injects data from the MovieCard component using the MAT_DIALOG_DATA injection token.
     * The data can be accessed to populate the view.
     * @param data
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) {}

  ngOnInit(): void {}
}
