/**
 *
 */
import * as fabric from 'fabric';
import { GraphicCanvas } from './graphic.canvas';

export class EventHandler {
  private el: HTMLElement;
  private graphicCanvas: GraphicCanvas;

  constructor(el: HTMLElement) {
    this.el = el;
  }

  init() {
    const canvas: HTMLCanvasElement = this.el.shadowRoot?.querySelector('canvas')!;
    if (!canvas) return;

    this.graphicCanvas = new GraphicCanvas({ canvas, config: {}, src: '' });

    this.graphicCanvas.addText('Hello world');
  }
}
