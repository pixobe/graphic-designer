import { Component, Host, h, Element, Prop, Event, EventEmitter, State, Listen } from '@stencil/core';
import { AppEvent, AppEventType, GraphicDesingConfig } from 'src';
import { EventHandler } from 'src/core/event.handler';
import { ResizeHandler, ResizeCanvas } from 'src/utils/render-utils';

@Component({
  tag: 'graphic-designer',
  styleUrl: 'graphic-designer.scss',
  shadow: true,
})
export class GraphicDesigner {
  @Element()
  el!: HTMLGraphicDesignerElement;

  @Prop()
  src: string;
  @Prop()
  config: GraphicDesingConfig;

  @Event({ eventName: 'appEvent' })
  appEventEmiiter: EventEmitter<AppEvent<any>>;

  @State()
  drawerOpen: boolean = false;
  @State()
  drawerContent: string = '';

  eventHandler: EventHandler;

  @Listen('appEvent')
  async appEventListener(event: CustomEvent<AppEvent<any>>): Promise<void> {
    const detail: AppEvent<any> = event.detail;
    this.invokeEvent(detail.type, detail.payload);
    this.closeDrawer();
  }

  downloadEvent() {
    this.appEventEmiiter.emit({ type: AppEventType.DownloadImage });
  }

  async componentWillLoad() {
    try {
      if (typeof this.config === 'string') {
        this.config = JSON.parse(this.config);
      }
    } catch (e) {
      console.error(e)
    }
    this.eventHandler = new EventHandler(this.el, this.src);
  }

  @ResizeHandler
  @ResizeCanvas
  componentDidLoad() {
    this.eventHandler.init();
  }

  handleToolClick(tool: string) {
    this.drawerContent = tool;
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  handleDownload(format: string) {
    this.invokeEvent(AppEventType.DownloadImage, { format });
    this.closeDrawer();
  }

  async invokeEvent(eventType: AppEventType, props: any): Promise<void> {
    await this.eventHandler.handleEvent({ type: eventType, payload: props });
  }

  renderDrawerContent() {
    switch (this.drawerContent) {
      case 'emoji':
        return (
          <div class="drawer-section">
            <h4>Add Emoji</h4>
            <emoji-picker></emoji-picker>
          </div>
        );
      case 'draw':
        return (
          <div class="drawer-section">
            <h4>Draw Settings</h4>
            <free-drawing></free-drawing>
          </div>
        );
      case 'text':
        return (
          <div class="drawer-section">
            <h4>Text Settings</h4>
            <graphic-text></graphic-text>
          </div>
        );
      case 'image':
        console.log(this.config?.gallery)
        return (
          <div class="drawer-section">
            <h4>Media Gallery</h4>
            <graphic-gallery mediaGallery={this.config?.gallery}></graphic-gallery>
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <Host>
        <div class="graphic-designer">
          {/* Sidebar for large screens */}
          <aside class="gd-sidebar" role="complementary" aria-label="tools">
            <button class="tool-btn" onClick={() => this.handleToolClick('emoji')}>😃  Emoji</button>
            <button class="tool-btn" onClick={() => this.handleToolClick('draw')}>✏️ Draw</button>
            <button class="tool-btn" onClick={() => this.handleToolClick('text')}>⭐  Text</button>
            <button class="tool-btn" onClick={() => this.handleToolClick('image')}>🎄 Gallery</button>
            <button class="tool-btn download" onClick={() => this.downloadEvent()}>⬇️ Download</button>
          </aside>

          {/* Overlay Drawer */}
          {this.drawerOpen && (
            <div class="drawer-overlay" onClick={() => this.closeDrawer()}>
              <div class="drawer-panel" onClick={(e) => e.stopPropagation()}>
                <button class="drawer-close" onClick={() => this.closeDrawer()}>✕</button>
                {this.renderDrawerContent()}
              </div>
            </div>
          )}

          {/* Canvas area */}
          <main class="gd-canvas-area">
            <div class="gd-canvas-wrap canvas-wrapper">
              <canvas></canvas>
            </div>
          </main>

          {/* Footer for mobile */}
          <footer class="gd-footer">
            <button class="icon-btn" aria-label="Add Emoji" onClick={() => this.handleToolClick('emoji')}>😃</button>
            <button class="icon-btn" aria-label="Draw" onClick={() => this.handleToolClick('draw')}>✏️</button>
            <button class="icon-btn" aria-label="Star" onClick={() => this.handleToolClick('text')}>⭐</button>
            <button class="icon-btn" aria-label="Tree" onClick={() => this.handleToolClick('image')}>🎄</button>
            <button class="icon-btn" aria-label="Download" onClick={() => this.downloadEvent()}>⬇️</button>
          </footer>
        </div>
      </Host>
    );
  }
}
