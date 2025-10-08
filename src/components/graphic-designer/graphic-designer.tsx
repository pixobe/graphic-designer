import { Component, Host, h, Element, Prop } from '@stencil/core';
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
  render() {
    return (
      <Host>
        <div class="graphic-designer">
          {/* Sidebar for large screens */}
          <aside class="gd-sidebar" role="complementary" aria-label="tools">
            <h3>Tools</h3>
            <button class="tool-btn">😃 Add Emoji</button>
            <button class="tool-btn">✏️ Draw</button>
            <button class="tool-btn">⭐ Add Star</button>
            <button class="tool-btn">🎄 Add Ornament</button>
            <button class="tool-btn download">⬇️ Download</button>
          </aside>

          {/* Canvas area */}
          <main class="gd-canvas-area">
            <div class="gd-canvas-wrap canvas-wrapper">
              <canvas></canvas>
            </div>
          </main>

          {/* Footer for mobile */}
          <footer class="gd-footer">
            <button class="icon-btn" aria-label="Add Emoji">😃</button>
            <button class="icon-btn" aria-label="Draw">✏️</button>
            <button class="icon-btn" aria-label="Star">⭐</button>
            <button class="icon-btn" aria-label="Ornament">🎄</button>
            <button class="icon-btn" aria-label="Download">⬇️</button>
          </footer>
        </div>
      </Host>
    );
  }
}

