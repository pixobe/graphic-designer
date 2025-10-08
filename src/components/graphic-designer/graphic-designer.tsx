import { Component, Host, h, Element, Prop, Event, EventEmitter, State } from '@stencil/core';
import { EventHandler } from 'src/core/event.handler';
import { ResizeHandler, ResizeCanvas } from 'src/utils/render-utils';

@Component({
  tag: 'graphic-designer',
  styleUrl: 'graphic-designer.scss',
  shadow: true,
})
export class GraphicDesigner {
  @Element() el: HTMLGraphicDesignerElement;

  @Prop()
  src: string;

  @Prop()
  config: Record<string, any>;

  @Event()
  appEvents: EventEmitter;

  @State()
  drawerOpen: boolean = false;

  @State()
  drawerContent: string = '';

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

  raiseEvent() {

  }

  handleToolClick(tool: string) {
    this.drawerContent = tool;
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  renderDrawerContent() {
    switch (this.drawerContent) {
      case 'emoji':
        return (
          <div class="drawer-section">
            <h4>Add Emoji</h4>
            <div class="emoji-grid">
              <button class="emoji-option">😃</button>
              <button class="emoji-option">🎄</button>
              <button class="emoji-option">⭐</button>
              <button class="emoji-option">❤️</button>
              <button class="emoji-option">🎁</button>
              <button class="emoji-option">⛄</button>
            </div>
          </div>
        );
      case 'draw':
        return (
          <div class="drawer-section">
            <h4>Draw Settings</h4>
            <label>Brush Size:</label>
            <input type="range" min="1" max="20" value="5" />
            <label>Color:</label>
            <input type="color" value="#000000" />
          </div>
        );
      case 'text':
        return (
          <div class="drawer-section">
            <h4>Add Text</h4>
            <textarea placeholder="Enter text..."></textarea>
            <label>Font Size:</label>
            <input type="number" value="16" />
          </div>
        );
      case 'download':
        return (
          <div class="drawer-section">
            <h4>Download</h4>
            <button class="download-option">PNG</button>
            <button class="download-option">JPG</button>
            <button class="download-option">SVG</button>
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