import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ActivationStart,
  ResolveStart,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { map, skip } from 'rxjs';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isNavigating = this.router.events.pipe(
    map(
      (event) =>
        event instanceof RouteConfigLoadStart ||
        event instanceof ActivationStart ||
        event instanceof ResolveStart
    )
  );

  constructor(private router: Router, private searchSvc: SearchService) {}

  ngOnInit() {
    this.searchSvc.selectedTags.pipe(skip(1)).subscribe((tags) => {
      this.router.navigate([''], { queryParams: { tag: tags } });
    });
  }
}
