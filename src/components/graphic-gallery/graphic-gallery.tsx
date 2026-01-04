import { Component, Prop, Host, h, Element, Event, EventEmitter } from '@stencil/core';
import { AppEvent, MediaGallery } from 'src';

@Component({
  tag: 'graphic-gallery',
  styleUrl: 'graphic-gallery.scss',
  shadow: true,
})
export class GraphicGallery {
  @Element()
  el: HTMLElement;

  @Prop()
  mediaGallery: MediaGallery[];

  @Event({ eventName: 'appEvent' })
  mediaSelectEvent: EventEmitter<AppEvent<any>>;

  render() {
    return (
      <Host>
        <div class="gallery-grid">
          <h3>Media Gallery</h3>
          <p-mediagallery value={this.mediaGallery}></p-mediagallery>
        </div>
      </Host>
    );
  }
}