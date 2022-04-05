import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {key} from '../../assets/secret'
const baseUrl = 'https://api.themoviedb.org/3/';
const countryUrl = 'https://restcountries.com/v3.1/all';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  constructor(private http: HttpClient) {}

  getAllMovies(page: number) {
    return this.http.get<any>(
      `${baseUrl}movie/popular?api_key=${key}&language=en-US&page=${page}`
    );
  }

  getSingleMovie(id: number) {
    return this.http.get<any>(
      `${baseUrl}movie/${id}?api_key=${key}&language=en-US&append_to_response=release_dates`
    );
  }

  getAllCountries() {
    return this.http.get<any>(countryUrl);
  }

  getAllGenre() {
    return this.http.get<any>(
      `${baseUrl}genre/movie/list?api_key=${key}&language=en-US`
    );
  }

  getAllFilters(sort: string, genre: any, page: number) {
    if (genre == []) {
      return this.http.get<any>(
        `${baseUrl}discover/movie?api_key=${key}&language=en-US&sort_by=${sort}&include_adult=true&include_video=false&page=${page}`
      );
    } else {
      return this.http.get<any>(
        `${baseUrl}discover/movie?api_key=${key}&language=en-US&sort_by=${sort}&with_genres=${genre}&include_adult=true&include_video=false&page=${page}`
      );
    }
  }
}