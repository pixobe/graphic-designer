import { Component, Prop, Host, h, Element, Event, EventEmitter } from '@stencil/core';
import { AppEvent, AppEventType, MediaGallery } from 'src';

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

  emitMediaSelect = (e) => {
    const payload = e.detail;
    this.mediaSelectEvent.emit({ type: AppEventType.AddImage, payload })
  }

  render() {
    return (
      <Host>
        <div class="gallery-grid">
          <div class="gallery-container">
            <p-mediagallery value={this.mediaGallery} onImageSelect={this.emitMediaSelect} cols={4}></p-mediagallery>
          </div>
        </div>
      </Host>
    );
  }
}