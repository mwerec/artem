import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Observable, startWith, Subject, takeUntil } from 'rxjs';
import { Settings } from '../types/Settings';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SettingsService implements OnDestroy {
  private readonly unsubscribe = new Subject<void>();
  readonly form = this.formBuilder.group(this.initialSettings);

  constructor(
    private formBuilder: FormBuilder,
    private injector: Injector,
    private overlay: Overlay
  ) {
    this.listen('safeSearch').subscribe((v) => (this.safeSearch = v));
    this.listen('blurEffect').subscribe((v) => (this.blurEffect = v));
  }

  set(value: Partial<Settings>) {
    this.form.patchValue(value);
  }

  listen(): Observable<Settings>;
  listen<T extends keyof Settings>(key: T): Observable<Settings[T]>;
  listen(key?: any) {
    if (!key) {
      return this.form.valueChanges.pipe(
        startWith(this.form.value),
        takeUntil(this.unsubscribe)
      );
    }
    return this.form
      .get(key)
      .valueChanges.pipe(
        startWith(this.form.get(key).value),
        takeUntil(this.unsubscribe)
      );
  }

  get(): Settings;
  get<T extends keyof Settings>(key: T): Settings[T];
  get(key?: any) {
    if (!key) return this.form.value;
    return this.form.get(key).value;
  }

  async open() {
    const { SettingsComponent } = await import(
      '@standalones/settings/settings.component'
    );
    const overlayRef = this.overlay.create({ hasBackdrop: true });
    const dialogRef = new SettingsComponent.DialogRef(overlayRef);
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: SettingsComponent.DialogRef,
          useValue: dialogRef,
        },
      ],
    });
    const settingsPortal = new ComponentPortal(
      SettingsComponent,
      null,
      injector
    );
    dialogRef.componentInstance = overlayRef.attach(settingsPortal).instance;
    overlayRef.backdropClick().subscribe(() => dialogRef.close());
    return dialogRef;
  }

  private set safeSearch(value: Settings['safeSearch']) {
    if (!value) sessionStorage.setItem('safeSearch', 'OFF');
    else sessionStorage.removeItem('safeSearch');
  }

  private set blurEffect(value: Settings['blurEffect']) {
    if (!value) localStorage.setItem('blurEffect', 'OFF');
    else localStorage.removeItem('blurEffect');
  }

  private get initialSettings(): Settings {
    return {
      safeSearch: !sessionStorage.getItem('safeSearch'),
      blurEffect: !localStorage.getItem('blurEffect'),
    };
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
