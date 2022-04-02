import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GalleryService } from 'src/app/gallery.service';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.css'],
})
export class PictureFormComponent implements OnInit {
  // @ViewChild('picture') picture!: ElementRef;
  // file!: File;
  caption!: string;
  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {}
  // onFileSelected(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   let files: FileList | null = target.files;
  //   if (files) {
  //     console.log(files);
  //     this.file = files[0];
  //     console.log('NEW IMAGE FILE: ', this.file);
  //   } else {
  //     console.log('No Files');
  //   }
  // }
  onCaptionChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.caption = target.value;
  }
  onUpload() {
    // console.log('PICTURE: ', this.file);
    console.log('CAPTION: ', this.caption);
    this.galleryService.sendNewPhoto(this.caption);
  }
  onClear() {}
}
