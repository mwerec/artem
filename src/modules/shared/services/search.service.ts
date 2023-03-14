import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface Query {
  page: number | null;
  tag: string[];
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private lastSearchSource: BehaviorSubject<Query>;
  lastSearch: Observable<Query>;

  constructor(private router: Router) {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get('page')) || null;
    const tag = params.getAll('tag').slice(0, 2);

    this.lastSearchSource = new BehaviorSubject<Query>({ page, tag });
    this.lastSearch = this.lastSearchSource.asObservable();
  }

  search(query: Partial<Query>) {
    this.lastSearchSource.next({ ...this.getLastSearch(), ...query });
    this.router.navigate([''], {
      queryParams: this.getLastSearch(),
    });
  }

  /**
   * Updates search state without triggering navigation/search
   * Intended for initialization & hard-navigation only
   */
  override(query: Query) {
    this.lastSearchSource.next(query);
  }

  getLastSearch() {
    return this.lastSearchSource.getValue();
  }
}
