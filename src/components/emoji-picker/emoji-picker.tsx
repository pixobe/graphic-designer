import { Component, Host, h, Element, Event, EventEmitter } from '@stencil/core';
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'
import { AppEvent, AppEventType, } from 'src';

@Component({
  tag: 'emoji-picker',
  styleUrl: 'emoji-picker.scss',
  shadow: true,
})
export class EmojiPicker {

  @Element()
  el: HTMLEmojiPickerElement;

  @Event({ eventName: 'appEvent' })
  emojiSelectEventEmitter: EventEmitter<AppEvent<any>>;

  onEmojiSelect(emoji: any) {
    this.emojiSelectEventEmitter.emit({ type: AppEventType.AddEmoji, payload: emoji });
  }

  componentDidLoad() {
    const picker = new Picker({ data, onEmojiSelect: this.onEmojiSelect.bind(this) });
    this.el.shadowRoot?.appendChild(picker as any)
  }

  render() {
    return (
      <Host>
      </Host>
    );
  }
}
