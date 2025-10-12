import { Component, Host, h, Event, EventEmitter, Element } from '@stencil/core';
import { AppEvent, AppEventType, FreeDrawingDto } from 'src';

@Component({
  tag: 'free-drawing',
  styleUrl: 'free-drawing.scss',
  shadow: true,
})
export class FreeDrawing {

  @Element()
  el!: HTMLGraphicDesignerElement;

  @Event({ eventName: 'appEvent' })
  eventEmitter: EventEmitter<AppEvent<FreeDrawingDto>>;

  emit() {
    const brushSizeElement = this.el.shadowRoot!.querySelector('#brush-size') as HTMLInputElement;
    const brushColorElement = this.el.shadowRoot!.querySelector('#brush-color') as HTMLInputElement;
    const brushTypeElement = this.el.shadowRoot!.querySelector('input[name="brushType"]:checked') as HTMLInputElement;

    this.eventEmitter.emit({
      type: AppEventType.StartDrawing,
      payload: {
        brushSize: parseInt(brushSizeElement?.value) || 5,
        brushType: brushTypeElement?.value || 'pencil',
        color: brushColorElement?.value || '#000000'
      }
    });
  }


  render() {
    return (
      <Host>
        <form class="form-group">
          <div class="form-element">
            <label>Brush Size:</label>
            <input type="range" min="1" max="20" value="5" id="brush-size" />
          </div>
          <div class="form-element">
            <label>Color:</label>
            <input type="color" value="#000000" id="brush-color" />
          </div>
          <div>
            <div>
              <label htmlFor='pencil'>
                <input type="radio" value="pencil" id="pencil" name="brushType" class="brush-type" />Pencil
              </label>
              <label htmlFor='spray'>
                <input type="radio" value="spray" id="spray" name="brushType" class="brush-type" />Spray
              </label>
              <label htmlFor='pattern'>
                <input type="radio" value="pattern" id="pattern" name="brushType" class="brush-type" />Pattern
              </label>
              <label htmlFor='cirlce'>
                <input type="radio" value="circle" id="cirlce" name="brushType" class="brush-type" />Circle
              </label>
            </div>
          </div>
          <div class="form-buttons">
            <button class="btn-primary" onClick={() => this.emit()} type="button">Start Drawing</button>
          </div>
        </form>
      </Host>
    );
  }
}
