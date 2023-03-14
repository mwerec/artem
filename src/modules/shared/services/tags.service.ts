import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Subject } from 'rxjs';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private suggestedTagsSource = new BehaviorSubject<string[]>([]);
  private tagsAddFailSource = new Subject<void>();
  public suggestedTags = this.suggestedTagsSource.asObservable();
  public tagsAddFail = this.tagsAddFailSource.asObservable();

  public selectedTags = this.searchSvc.lastSearch.pipe(
    map((state) => state.tag),
    distinctUntilChanged(
      (prev, curr) =>
        curr.every((tag) => prev.includes(tag)) && curr.length === prev.length
    )
  );

  constructor(private searchSvc: SearchService) {}

  addTag(tag: string) {
    if (
      this.getSelectedTags().length > 1 ||
      this.getSelectedTags().includes(tag)
    ) {
      return this.tagsAddFailSource.next();
    }
    // Force reset page when tags change
    this.searchSvc.search({
      tag: [...this.getSelectedTags(), tag],
      page: null,
    });
  }

  removeTag(tag: string) {
    // Force reset page when tags change
    this.searchSvc.search({
      tag: this.getSelectedTags().filter((t) => t !== tag),
      page: null,
    });
  }

  updateSuggestedTags(tags: string[]) {
    this.suggestedTagsSource.next(tags);
  }

  getSelectedTags() {
    return this.searchSvc.getLastSearch().tag;
  }

  getSuggestedTags() {
    return this.suggestedTagsSource.getValue();
  }
}
