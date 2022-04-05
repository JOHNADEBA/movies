import { Component } from '@angular/core';
import { MoviesApiService } from './services/movies-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angularapp';
  page: number = 1;
  clientMovies: any = [];
  selectedQuantity = '';
  moveieDetails: any = [];
  showMovieDetail = false;

  constructor(private allMovies: MoviesApiService) {
    this.onGetAllMovies(this.page);
  }

  onGetAllMovies(pageNo: number) {
    this.allMovies.getAllMovies(pageNo).subscribe((results: any) => {
      this.clientMovies = [...this.clientMovies, ...results.results];
      // console.log(this.clientMovies);
    });
  }

  onLoadMore() {
    this.page += 1;
    this.onGetAllMovies(this.page);
  }

  getFilters(results: any) {
    this.page = 1;
    this.clientMovies = [...results.results];
  }

  getMovie(id: number, showMovieDetail: boolean) {
    this.allMovies.getSingleMovie(id).subscribe((results: any) => {
      this.moveieDetails = results;
      this.showSingleMovie(showMovieDetail);
    });
  }

  showSingleMovie(showMovieDetail: boolean) {
    this.showMovieDetail = showMovieDetail;
    console.log( 'parent', showMovieDetail);
    
  }
}
