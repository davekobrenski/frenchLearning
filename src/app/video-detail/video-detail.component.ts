import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss'],
})
export class VideoDetailComponent implements OnInit {
  videoData;
  videoMetaData;
  videoTitle;
  videoAuthor;
  originalUrl;
  videoImgUrl;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public db: DbService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.videoData = this.db.doc$('languageVideos/' + id).pipe(first());

    this.videoData.subscribe((myData) => {
      if (myData) {
        this.videoMetaData = myData.video;
        this.videoTitle = myData.video.title;
        this.videoAuthor = myData.video.author;
        this.originalUrl = myData.video.originalUrl;

        this.videoImgUrl = 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';

        console.log(this.videoMetaData);
      }
    });
  }

}
