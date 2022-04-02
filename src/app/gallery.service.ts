import { Injectable } from '@angular/core';
// import {Buffer} from 'buffer';
import {Subject} from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from './gallery/frame/photo.model';


@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private photos: Photo[] = [];
  private photo!: Photo;
  photosChangedEvent = new Subject<Photo[]>();
  private maxPhotoId: number;
  constructor(private http: HttpClient) {
    this.photos = [];
    this.maxPhotoId = 0;
   }

   getMaxId() {
    
    if (this.photos.length > 0) {
      return this.photos[this.photos.length - 1].id + 1
    } else {
      return 0;
    }
    // for (const photo of this.photos) {
    //   let currentId = +photo.id;
    //   if (currentId > maxId) {
    //     maxId = currentId;
    //   }
    // }
    // return maxId;
  }

  getPhotos() {
    console.log('SERVICE: getPhotos') 

    this.http.get<{photo: Photo[]}>(
      'http://localhost:3000/gallery'
    ).subscribe((res) => {
      console.log('Response:', res);
      this.photos = res.photo;
      this.photosChangedEvent.next(this.photos.slice());
    })
    return this.photos;
  }
  sendNewPhoto(caption: string) {
    const id = this.getMaxId()
    
  // const buffer = file.arrayBuffer().then(buff => {

    // console.log('buffer', buff.toString())
    // const uploadData = new FormData();
    // uploadData.append('id', id)
    // uploadData.append('file', file)
    // uploadData.append('caption', caption)
    const photo: Photo = {id: id, blog: caption};
    console.log(photo)
    this.photos = [...this.photos,photo]
    this.http.post<{message: String, blog: Photo }>(
      "http://localhost:3000/gallery",
      photo
      ).subscribe (res => {
        console.log(res);
      })
      this.photosChangedEvent.next(this.photos.slice());
    }
    
    updatePhoto(photo: Photo) {
      console.log('updating')
      this.http.put<{message: String, blog: Photo }>(
        "http://localhost:3000/gallery/" + photo.id,
        photo
        ).subscribe (res => {
          console.log(res);
        })
    }
    deletePhoto(photo: Photo) {
      console.log('deleting')
      this.http.delete<{message: String}>(
        "http://localhost:3000/gallery/" + photo.id
        ).subscribe (res => {
          console.log(res);
          this.getPhotos();
        })
      // this.photosChangedEvent.next(this.photos.slice());
    }
  }