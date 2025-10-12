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

  @Event()
  appEventEmiiter: EventEmitter<AppEvent<any>>;

  @State()
  drawerOpen: boolean = false;
  @State()
  drawerContent: string = '';

  eventHandler: EventHandler;

  @Listen('appEvent')
  appEventListener(event: CustomEvent<AppEvent<any>>) {
    const detail: AppEvent<any> = event.detail;
    this.invokeEvent(detail.type, detail.payload);
    this.closeDrawer();
  }

  async componentWillLoad() {
    this.eventHandler = new EventHandler(this.el);
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

  handleAddText() {
    const textElement = this.el.shadowRoot!.querySelector('#graphic-text') as HTMLTextAreaElement;
    const colorElement = this.el.shadowRoot!.querySelector('#text-color') as HTMLInputElement;

    if (textElement && textElement.value.trim()) {
      this.invokeEvent(AppEventType.AddText, {
        text: textElement.value,
        color: colorElement?.value || '#000000'
      });
      this.closeDrawer();
    }
  }

  handleStartDrawing() {
    const brushSizeElement = this.el.shadowRoot!.querySelector('#brush-size') as HTMLInputElement;
    const brushColorElement = this.el.shadowRoot!.querySelector('#brush-color') as HTMLInputElement;

    this.invokeEvent(AppEventType.StartDrawing, {
      brushSize: brushSizeElement?.value || 5,
      color: brushColorElement?.value || '#000000'
    });
    this.closeDrawer();
  }

  handleDownload(format: string) {
    this.invokeEvent(AppEventType.DownloadImage, { format });
    this.closeDrawer();
  }

  invokeEvent(eventType: AppEventType, props: any) {
    this.eventHandler.handleEvent({ type: eventType, payload: props });
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
      case 'download':
        return (
          <div class="drawer-section">
            <h4>Download</h4>
            <button class="download-option" onClick={() => this.handleDownload('PNG')}>PNG</button>
            <button class="download-option" onClick={() => this.handleDownload('JPG')}>JPG</button>
            <button class="download-option" onClick={() => this.handleDownload('SVG')}>SVG</button>
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
            <button class="tool-btn" onClick={() => this.handleToolClick('emoji')}>😃 Add Emoji</button>
            <button class="tool-btn" onClick={() => this.handleToolClick('draw')}>✏️ Draw</button>
            <button class="tool-btn" onClick={() => this.handleToolClick('text')}>⭐ Add Text</button>
            <button class="tool-btn download" onClick={() => this.handleToolClick('download')}>⬇️ Download</button>
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
            <button class="icon-btn" aria-label="Tree" onClick={() => this.handleToolClick('emoji')}>🎄</button>
            <button class="icon-btn" aria-label="Download" onClick={() => this.handleToolClick('download')}>⬇️</button>
          </footer>
        </div>
      </Host>
    );
  }
}
