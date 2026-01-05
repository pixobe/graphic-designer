import { Component, Host, h, Event, EventEmitter, Element } from '@stencil/core';
import { AppEvent, AppEventType, GraphicTextDto } from 'src';

@Component({
  tag: 'graphic-text',
  styleUrl: 'graphic-text.scss',
  shadow: true,
})
export class GraphicText {

  @Element()
  el!: Element;

  @Event({ eventName: 'appEvent' })
  eventEmitter: EventEmitter<AppEvent<GraphicTextDto>>;

  formElementRef: any;

  emit = async () => {
    const payload = await this.formElementRef?.getFormData();
    this.eventEmitter.emit({
      type: AppEventType.AddText,
      payload
    });
  }

  render() {
    return (
      <Host>
        <p-form ref={el => this.formElementRef = el}>
          <div class="form-group">
            <div class="form-element">
              <p-textarea name="text" label="Text"></p-textarea>
            </div>
            <div class="form-element">
              <p-colorpicker name="stroke" label="Color" />
            </div>
            <div class="form-buttons">
              <button class="btn-primary" onClick={() => this.emit()} type="button">Add</button>
            </div>
          </div>
        </p-form>
      </Host>
    );
  }
}
