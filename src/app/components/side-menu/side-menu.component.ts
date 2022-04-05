import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MoviesApiService } from '../../services/movies-api.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newGenreEvent = new EventEmitter<string>();

  showSort = false;
  showFilter = false;
  showWhere = false;
  isActive = false;
  selectedQuantity = 'popularity.desc';
  allGenres: any = [];
  isSelected: any = [];
  sidePage = 1;

  allCountries: any[] = [];
  constructor(private sideMenu: MoviesApiService) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllGenre();
  }

  getAllCountries() {
    this.sideMenu.getAllCountries().subscribe((results: any) => {
      this.allCountries = results;
      this.allCountries = [...this.allCountries, ...results];
      // console.log(this.allCountries[0].flags);
    });
  }

  getAllGenre() {
    this.sideMenu.getAllGenre().subscribe((results: any) => {
      this.allGenres = [...results.genres];
    });
  }

  getSortValue(selectedQuantity: string) {
    this.selectedQuantity = selectedQuantity;
    if (this.selectedQuantity !== '')
      this.isActive = true;
    else this.isActive = false;

    console.log(this.selectedQuantity);
  }

  selectGenre(genre: string) {
    if (!this.isSelected.includes(genre)) {
      this.isSelected.push(genre);
    } else {
      this.isSelected.splice(this.isSelected.indexOf(genre), 1);
    }

    if (this.isSelected.length > 0 )
      this.isActive = true;
    else this.isActive = false;
  }

  getAllFilters() {
    this.sideMenu
      .getAllFilters(this.selectedQuantity, this.isSelected, this.sidePage)
      .subscribe((results: any) => {
        this.newGenreEvent.emit(results);
      });
  }
}
