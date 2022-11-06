import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private selectedTagsSource = new BehaviorSubject<string[]>(
    new URLSearchParams(window.location.search).getAll('tag')
  );
  private suggestedTagsSource = new BehaviorSubject<string[]>([]);
  private selectedTagsFullSource = new Subject<void>();
  public selectedTags = this.selectedTagsSource.asObservable();
  public suggestedTags = this.suggestedTagsSource.asObservable();
  public selectedTagsFull = this.selectedTagsFullSource.asObservable();

  addTag(tag: string) {
    if (this.selectedTagsSource.value.length > 1) {
      this.selectedTagsFullSource.next();
      return 2;
    }
    const newTags = [...this.selectedTagsSource.value, tag];
    this.selectedTagsSource.next(newTags);
    return newTags.length;
  }

  removeTag(tag: string) {
    const newTags = this.selectedTagsSource.value.filter((t) => t !== tag);
    this.selectedTagsSource.next(newTags);
    return newTags.length;
  }

  getSelectedTags() {
    return this.selectedTagsSource.getValue();
  }

  getSuggestedTags() {
    return this.suggestedTagsSource.getValue();
  }

  updateSuggestedTags(tags: string[]) {
    this.suggestedTagsSource.next(tags);
  }
}
