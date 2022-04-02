import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PictureFormComponent } from './form/picture-form/picture-form.component';
import { GalleryComponent } from './gallery/gallery/gallery.component';
import { FrameComponent } from './gallery/frame/frame.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PictureFormComponent,
    GalleryComponent,
    FrameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
