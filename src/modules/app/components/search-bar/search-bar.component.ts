import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { BooruService } from '@modules/shared/services/booru.service';
import { TagsService } from '@modules/shared/services/tags.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, AfterViewInit, OnDestroy {
  separatorKeysCodes = [ENTER, SPACE];
  query = this.formBuilder.control('');
  unsubscribe = new Subject<void>();

  @ViewChild('input') inputRef: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private booruSvc: BooruService,
    public tagsSvc: TagsService
  ) {}

  ngOnInit() {
    this.query.valueChanges
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query) return of([]);
          return this.booruSvc.getTags(query).pipe(catchError(() => of([])));
        }),
        takeUntil(this.unsubscribe)
      )
      .subscribe((tags) => this.tagsSvc.updateSuggestedTags(tags));

    this.tagsSvc.selectedTags
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((tags) => {
        if (tags.length > 1) return this.query.disable();
        if (this.query.disabled) this.query.enable();
      });
  }

  ngAfterViewInit() {
    if (this.tagsSvc.getSelectedTags().length > 1) this.query.disable();
  }

  onTagSubmit(event: MatChipInputEvent) {
    if (!this.tagsSvc.getSuggestedTags().includes(event.value)) return;
    this.addTag(event.value);
    event.chipInput.clear();
  }

  onTagAutocomplete(event: MatAutocompleteSelectedEvent) {
    this.addTag(event.option.value);
    this.inputRef.nativeElement.value = '';
  }

  onTagRemove(tag: string) {
    this.tagsSvc.removeTag(tag);
  }

  addTag(tag: string) {
    this.tagsSvc.addTag(tag);
    this.query.setValue('');
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
