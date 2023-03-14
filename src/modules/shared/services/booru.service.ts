import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BooruPost } from '../types/BooruPost';

@Injectable({
  providedIn: 'root',
})
export class BooruService {
  readonly hostname = 'https://danbooru.donmai.us';

  constructor(private http: HttpClient) {}

  getPosts(tags: string[], page?: number) {
    return this.http.get<BooruPost[]>(`${this.hostname}/posts.json`, {
      params: {
        page: page || 1,
        'post[tags]': tags.filter(Boolean).join(' '),
        limit: 100,
      },
    });
  }

  getPost(id: string) {
    return this.http.get<BooruPost>(`${this.hostname}/posts/${id}.json`);
  }

  getPostsCount(tags: string[]) {
    return this.http
      .get<{ counts: { posts: number } }>(
        `${this.hostname}/counts/posts.json`,
        { params: { tags: tags.filter(Boolean).join(' ') } }
      )
      .pipe(
        // Danbooru API limitations, cant go past page 1000
        map((res) => (res.counts.posts > 100000 ? 100000 : res.counts.posts))
      );
  }

  getTags(query: string) {
    return this.http
      .get<{ value: string }[]>(`${this.hostname}/autocomplete.json`, {
        params: {
          'search[query]': query,
          'search[type]': 'tag_query',
          version: 1,
          limit: 20,
        },
      })
      .pipe(map((res) => res.map((res) => res.value)));
  }
}
