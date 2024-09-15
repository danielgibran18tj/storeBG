import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {

  @Input({ required: true }) audioUrl!: string;
  @ViewChild('wave') container!: ElementRef;  // forma de llamar a nuestra referencia de html
  private ws!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit(): void {
    this.ws = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement
    });
    this.ws.on('play', () => this.isPlaying.set(true));
    this.ws.on('pause', () => this.isPlaying.set(false));
  }

  playPause() {
    this.ws.playPause()
  }
}
