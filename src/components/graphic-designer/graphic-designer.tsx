import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'graphic-designer',
  styleUrl: 'graphic-designer.scss',
  shadow: true,
})
export class GraphicDesigner {
  render() {
    return (
      <Host>
        Hello worlds where are you are you ther worls
      </Host>
    );
  }
}
