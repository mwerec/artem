import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
} from 'rxjs';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  private lengthSource = new BehaviorSubject(0);
  length = this.lengthSource.asObservable();
  page = this.searchSvc.lastSearch.pipe(
    map((state) => Number(state.page) || 1),
    distinctUntilChanged()
  );
  isFirstPage = this.page.pipe(map((page) => page <= 1));
  isLastPage = combineLatest([this.page, this.length]).pipe(
    map(([page, length]) => page * 100 >= length)
  );
  totalPages = this.length.pipe(map((length) => Math.ceil(length / 100)));

  constructor(private searchSvc: SearchService) {}

  incrementPage(value: number) {
    this.setPage((Number(this.searchSvc.getLastSearch().page) || 1) + value);
  }

  setPage(page: number) {
    this.searchSvc.search({ page: page === 1 ? null : page });
  }

  setLastPage() {
    this.setPage(Math.ceil(this.lengthSource.value / 100));
  }

  setLength(length: number) {
    this.lengthSource.next(length);
  }
}
