import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GalleryService } from 'src/app/gallery.service';
import { Photo } from '../frame/photo.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public file!: File;
  public photos: Photo[] = [
    new Photo(1, 'path1'),
    new Photo(2, 'path2'),
    new Photo(3, 'path3'),
  ];
  private changePhotosSub!: Subscription;
  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.photos = this.galleryService.getPhotos();
    console.log('gallery',this.photos)
    this.changePhotosSub = this.galleryService.photosChangedEvent.subscribe(
      (photos: Photo[]) => {
        this.photos = photos;
      }
    )
  }

}
