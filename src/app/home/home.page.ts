import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  allVideos;
  allData;
  imgRootUrl = 'https://img.youtube.com/vi/';
  imgEndUrl = '/hqdefault.jpg';
  constructor(public db: DbService) { }

  ngOnInit() {
    this.allVideos = this.db.collectionShare$('languageVideos',
    ref => ref.where('video.approved', '==', 1).orderBy('video.dateAdded', 'desc'));

    this.allVideos.subscribe((myData) => {
      console.log(myData);
      this.allData = myData;
    });
  }
}
