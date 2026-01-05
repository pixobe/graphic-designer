import { Component, Host, h, Event, EventEmitter, Element } from '@stencil/core';
import { AppEvent, AppEventType, FreeDrawingDto } from 'src';

@Component({
  tag: 'free-drawing',
  styleUrl: 'free-drawing.scss',
  shadow: true,
})
export class FreeDrawing {

  @Element()
  el!: HTMLElement;

  @Event({ eventName: 'appEvent' })
  eventEmitter: EventEmitter<AppEvent<FreeDrawingDto>>;

  formElementRef: any;

  onSaveClick = async () => {
    const payload = await this.formElementRef.getFormData();
    this.eventEmitter.emit({
      type: AppEventType.StartDrawing,
      payload
    });
  }


  render() {
    return (
      <Host>
        <p-form ref={el => this.formElementRef = el}>
          <div class="form-group">
            <div class="form-element">
              <label>Brush Size:</label>
              <input type="range" min="1" max="20" value="5" id="brush-size" name="brushSize" />
            </div>
            <div class="form-element">
              <p-colorpicker name="color" label="Color" value='#333333'></p-colorpicker>
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
              <button class="btn-primary" onClick={this.onSaveClick} type="button">Done</button>
            </div>
          </div>
        </p-form>
      </Host>
    );
  }
}
