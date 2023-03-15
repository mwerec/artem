import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { fromEvent, merge, Subject, takeUntil, throttleTime } from 'rxjs';

@Component({
  selector: 'app-video-glow',
  templateUrl: './video-glow.component.html',
  styleUrls: ['./video-glow.component.scss'],
})
export class VideoGlowComponent implements AfterViewInit, OnDestroy {
  unsubscribe = new Subject<void>();

  @Input() video: HTMLVideoElement;

  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    if (!this.video.paused && !this.video.ended) this.loop();
    else this.drawFrame();

    merge(
      fromEvent(this.video, 'seeking').pipe(throttleTime(100)),
      fromEvent(this.video, 'seeked'),
      fromEvent(this.video, 'load')
    )
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.drawFrame());

    fromEvent(this.video, 'play')
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.loop());
  }

  drawFrame() {
    this.canvasRef.nativeElement
      .getContext('2d')
      .drawImage(
        this.video,
        0,
        0,
        this.canvasRef.nativeElement.width,
        this.canvasRef.nativeElement.height
      );
  }

  loop() {
    if (this.video.paused || this.video.ended) return;
    this.drawFrame();
    requestAnimationFrame(() => this.loop());
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
