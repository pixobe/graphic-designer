import { Canvas, IText } from 'fabric';

export interface GraphicCanvasConfig {
  src: string;
  canvas: HTMLCanvasElement;
  config: Record<string, any>;
}

/**
 * Custom implmentation of fabric.Canvas
 */
export class GraphicCanvas extends Canvas {
  src: string;
  config: Record<string, any>;

  constructor({ src, config, canvas }: GraphicCanvasConfig) {
    super(canvas, config);
    this.src = src;
    this.config = config;
    this.requestRenderAll();
  }
}
