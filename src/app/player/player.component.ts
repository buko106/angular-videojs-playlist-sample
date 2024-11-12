import videojs from 'video.js';
import 'videojs-playlist';
import './service-logo';

import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import Player from "video.js/dist/types/player";


@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  template: '<video #target class="video-js"></video>',
  styleUrl: './player.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target!: ElementRef;

  private player: Player | undefined;

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit() {
    const player = videojs(this.target.nativeElement, {
      controls: true, // TODO: コントロールの代わりにタップできるボタンを置く
      controlBar: {
        skipButtons: {
          forward: 10,
          backward: 10,
        }
      }
    });

    player.on('playlistitem', () => {
      if ((player as any).playlist.currentIndex() > 0) {
        player.controls(true); // ジングルが終わってからコントロールがでる
      }
    })

    const videoList = [
      {
        sources: [{src: 'http://media.w3.org/2010/05/sintel/trailer.mp4', type: 'video/mp4'}],
        poster: 'http://media.w3.org/2010/05/sintel/poster.png'
      },
      {
        sources: [
          {
            src: 'http://vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4'
          },
          {
            src: 'http://vjs.zencdn.net/v/oceans.mp4?duplicate=true', type: 'video/mp4'
          }
        ],
        poster: 'https://image.mux.com/5g1hMA6dKAe8DCgBB901DYB200U65ev2y00/thumbnail.jpg?time=43'
      }, {
        sources: [
          {src: 'http://media.w3.org/2010/05/video/movie_300.mp4', type: 'video/mp4'}
        ],
        poster: 'http://media.w3.org/2010/05/video/poster.png'
      }
    ];

    player.addChild('ServiceLogoComponent');
    (player as any).playlist(videoList);
    (player as any).playlist.autoadvance(0); // 自動で次のビデオに移行
    this.player = player;
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
