import { Component, Host, h, Element, Prop, Event, EventEmitter, State, Listen } from '@stencil/core';
import { AppEvent, AppEventType } from 'src';
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
  config: Record<string, any>;

  @Event()
  appEventEmiiter: EventEmitter<AppEvent>;

  @State()
  drawerOpen: boolean = false;

  @State()
  drawerContent: string = '';

  @Listen('appEvent')
  appEventListener(event: CustomEvent<AppEvent>) {
    console.log('Received the custom todoCompleted event: ', event.detail);
  }

  eventHandler: EventHandler;

  componentWillLoad() {
    console.log("Loading")
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

  handleEmojiClick(emoji: string) {
    this.invokeEvent(AppEventType.AddEmoji, { emoji });
    this.closeDrawer();
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
    console.log(eventType, props)
  }

  renderDrawerContent() {
    switch (this.drawerContent) {
      case 'emoji':
        return (
          <div class="drawer-section">
            <h4>Add Emoji</h4>
            <div class="emoji-grid">
              <button class="emoji-option" onClick={() => this.handleEmojiClick('😃')}>😃</button>
              <button class="emoji-option" onClick={() => this.handleEmojiClick('🎄')}>🎄</button>
              <button class="emoji-option" onClick={() => this.handleEmojiClick('⭐')}>⭐</button>
              <button class="emoji-option" onClick={() => this.handleEmojiClick('❤️')}>❤️</button>
              <button class="emoji-option" onClick={() => this.handleEmojiClick('🎁')}>🎁</button>
              <button class="emoji-option" onClick={() => this.handleEmojiClick('⛄')}>⛄</button>
            </div>
          </div>
        );
      case 'draw':
        return (
          <div class="drawer-section">
            <h4>Draw Settings</h4>
            <label>Brush Size:</label>
            <input type="range" min="1" max="20" value="5" id="brush-size" />
            <label>Color:</label>
            <input type="color" value="#000000" id="brush-color" />
            <button class="btn-primary" onClick={() => this.handleStartDrawing()}>Start Drawing</button>
          </div>
        );
      case 'text':
        return (
          <div class="drawer-section">
            <h4>Add Text</h4>
            <textarea placeholder="Enter text..." id="graphic-text"></textarea>
            <label>Font Color:</label>
            <input type="color" value="#000000" id="text-color" />
            <button class="btn-primary" onClick={() => this.handleAddText()}>Start Drawing</button>
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
            <h3>Tools</h3>
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
            <button class="icon-btn" aria-label="Ornament" onClick={() => this.handleToolClick('emoji')}>🎄</button>
            <button class="icon-btn" aria-label="Download" onClick={() => this.handleToolClick('download')}>⬇️</button>
          </footer>
        </div>
      </Host>
    );
  }
}