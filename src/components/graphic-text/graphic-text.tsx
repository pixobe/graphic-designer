import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'graphic-text',
  styleUrl: 'graphic-text.scss',
  shadow: true,
})
export class GraphicText {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
