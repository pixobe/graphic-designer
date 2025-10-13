import { Component, Prop, Host, h, Element, Event, EventEmitter, State } from '@stencil/core';
import { AppEvent, AppEventType, MediaGallery, MediaItem } from 'src';

@Component({
  tag: 'graphic-gallery',
  styleUrl: 'graphic-gallery.scss',
  shadow: true,
})
export class GraphicGallery {
  @Element()
  el: HTMLElement;

  @Prop()
  mediaGallery: MediaGallery;

  @Event({ eventName: 'appEvent' })
  mediaSelectEvent: EventEmitter<AppEvent<any>>;

  onImageSelect(image: MediaItem) {
    this.mediaSelectEvent.emit({ type: AppEventType.AddImage, payload: image });
  }


  @State()
  visibleImages: Set<number> = new Set();

  private observer: IntersectionObserver;

  componentDidLoad() {
    this.setupIntersectionObserver();
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index')!, 10);
          this.visibleImages = new Set([...this.visibleImages, index]);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe all image containers
    const imageContainers = this.el.shadowRoot!.querySelectorAll('.image-container');
    imageContainers.forEach(container => {
      this.observer.observe(container);
    });
  }

  render() {
    if (!this.mediaGallery || !this.mediaGallery.items) {
      return <Host></Host>;
    }

    return (
      <Host>
        <div class="gallery-grid">
          {this.mediaGallery.items.map((item, index) => (
            <div
              class="image-container"
              data-index={index}
              key={index}
            >
              {this.visibleImages.has(index) ? (
                <img
                  src={item.url}
                  alt={`${this.mediaGallery.name} - Image ${index + 1}`}
                  loading="lazy"
                  onClick={() => this.onImageSelect(item)}
                />
              ) : (
                <div class="placeholder"></div>
              )}
            </div>
          ))}
        </div>
        <slot></slot>
      </Host>
    );
  }
}