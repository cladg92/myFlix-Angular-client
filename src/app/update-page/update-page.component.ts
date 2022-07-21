import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss'],
})
export class UpdatePageComponent implements OnInit {
  @Input() userData: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdatePageComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Sends input to the backend to update user's data
   */
  updateUserInfo(): void {
    this.fetchApiData.updateUser(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log(result);
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Please login again with your new credentials',
          'OK',
          {
            duration: 4000,
          }
        );
      },
      (result) => {
        console.log(result);
        this.snackBar.open('User update not successful', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
