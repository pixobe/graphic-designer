import { Component, Host, h, Event, EventEmitter, Element } from '@stencil/core';
import { AppEvent, AppEventType, GraphicTextDto } from 'src';

@Component({
  tag: 'graphic-text',
  styleUrl: 'graphic-text.scss',
  shadow: true,
})
export class GraphicText {

  @Element()
  el!: HTMLGraphicDesignerElement;

  @Event({ eventName: 'appEvent' })
  eventEmitter: EventEmitter<AppEvent<GraphicTextDto>>;

  emit() {
    const textElement = this.el.shadowRoot!.querySelector('#graphic-text') as HTMLInputElement;
    const colorElement = this.el.shadowRoot!.querySelector('#text-color') as HTMLInputElement;

    this.eventEmitter.emit({
      type: AppEventType.AddText,
      payload: {
        text: textElement?.value || 'Edit Me',
        color: colorElement?.value || '#000000'
      }
    });
  }

  render() {
    return (
      <Host>
        <form class="form-group">
          <div class="form-element">
            <label>Text:</label>
            <textarea id="graphic-text" ></textarea>
          </div>
          <div class="form-element">
            <label>Color:</label>
            <input type="color" value="#000000" id="text-color" />
          </div>
          <div class="form-buttons">
            <button class="btn-primary" onClick={() => this.emit()} type="button">Add</button>
          </div>
        </form>
      </Host>
    );
  }
}
