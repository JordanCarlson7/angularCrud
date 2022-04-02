import { Component, Input, OnInit } from '@angular/core';
import { GalleryService } from 'src/app/gallery.service';
import { Photo } from './photo.model';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  @Input() public photo!: Photo;
  public text!: string;
  public edit: boolean = false;
  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
  }

  toggleEdit() {
    console.log('edit')
    this.edit = !this.edit;
  }
  editText(event: Event) {
    const target = event.target as HTMLInputElement;
    this.photo.blog = target.value;
    console.log(this.photo);
    this.galleryService.updatePhoto(this.photo);
    //update by id
  }
  delete() {
    this.galleryService.deletePhoto(this.photo);
    //delete by id
  }
}
