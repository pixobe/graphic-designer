import { Canvas, FabricImage, FabricObject } from 'fabric';

export interface GraphicCanvasConfig {
  src?: string;
  canvas: HTMLCanvasElement;
  config: Record<string, any>;
}

/**
 * Custom implmentation of fabric.Canvas
 */
export class GraphicCanvas extends Canvas {
  src?: string;
  config: Record<string, any>;

  constructor({ src, config, canvas }: GraphicCanvasConfig) {
    super(canvas, config);
    this.src = src;
    this.config = config;
    this.requestRenderAll();
  }

  /**
   *
   * @param obj
   */
  addCentered(obj: FabricObject): void {
    obj.set({
      originX: 'center',
      originY: 'center',
      left: this.width! / 2,
      top: this.height! / 2,
    });
    this.add(obj);
    this.requestRenderAll();
  }

  async renderBg(): Promise<void> {
    console.log('thissrc is ', this.src);
    if (this.src) {
      const img = await FabricImage.fromURL(this.src);

      // Calculate scale to contain (fit entire image within canvas)
      const scaleX = this.width! / img.width!;
      const scaleY = this.height! / img.height!;
      const scale = Math.min(scaleX, scaleY); // Use minimum to contain

      img.scale(scale);

      // Center the image
      img.set({
        originX: 'center',
        originY: 'center',
        left: this.width! / 2,
        top: this.height! / 2,
      });

      this.backgroundImage = img;
      this.requestRenderAll();
    }
  }
}
