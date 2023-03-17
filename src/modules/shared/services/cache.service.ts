import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import equal from 'deep-equal';

type CacheKey = string | readonly unknown[];

@Injectable({ providedIn: 'root' })
export class CacheService {
  private cache: [CacheKey, unknown, number][] = [];

  use<const K extends CacheKey, D>(
    key: K,
    stream: (key: K) => Observable<D>,
    cacheTime = 1000 * 60
  ) {
    const cached = this.cache.find(([cachedKey]) => equal(cachedKey, key));
    if (!cached)
      return stream(key).pipe(
        tap((data) =>
          this.cache.push([
            key,
            data,
            setTimeout(() => {
              this.cache = this.cache.filter(([cachedKey]) =>
                !equal(cachedKey, key)
              );
            }, cacheTime),
          ])
        )
      );

    return of(cached[1] as D);
  }
}

