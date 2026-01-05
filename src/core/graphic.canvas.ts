import { Canvas, FabricImage, FabricObject, util, BaseFabricObject, CanvasOptions } from 'fabric';
import { ControlBuilder, ControlConfig } from './custom-controls';

export interface GraphicCanvasConfig {
  src?: string;
  props?: Partial<CanvasOptions>;
  canvas: HTMLCanvasElement;
  config: Record<string, any>;
  data?: any;
  controlConfig?: ControlConfig;
}

/**
 * Custom implmentation of fabric.Canvas
 */
export class GraphicCanvas extends Canvas {
  /**
   *
   */
  options: GraphicCanvasConfig;

  constructor(opts: GraphicCanvasConfig) {
    super(opts.canvas, opts.props);
    this.options = opts;
  }

  async render(): Promise<void> {
    if (this.options.data) {
      await this.loadFromJSON(this.options.data);
      this.resize();
    } else if (this.options.src) {
      await this.renderBg();
    }
    // this.resize()
    this.requestRenderAll();
  }

  /**
   *
   * @param obj
   */
  addCentered(obj: FabricObject): void {
    obj.controls = ControlBuilder.build();
    obj.set({
      originX: 'center',
      originY: 'center',
      left: this.width! / 2,
      top: this.height! / 2,
    });
    this.add(obj);
    this.requestRenderAll();
  }

  async renderBg(): Promise<this> {
    if (this.options.src) {
      const backgroundImage = await FabricImage.fromURL(this.options.src, { crossOrigin: 'anonymous' });
      const originalWidth = Math.floor(backgroundImage.width * backgroundImage.scaleX);
      const originalHeight = Math.floor(backgroundImage.height * backgroundImage.scaleY);
      // Use findScaleToFit to maintain aspect ratio
      const scale = util.findScaleToFit({ width: originalWidth, height: originalHeight }, { width: this.width, height: this.height });
      // Calculate final scaled dimensions
      const scaledWidth = Math.floor(originalWidth * scale);
      const scaledHeight = Math.floor(originalHeight * scale);

      backgroundImage.set({
        scaleX: backgroundImage.scaleX * scale,
        scaleY: backgroundImage.scaleY * scale,
        left: 0,
        top: 0,
        originX: 'left',
        originY: 'top',
      });

      this.backgroundImage = backgroundImage;
      // Trim canvas to exact image dimensions
      this.setDimensions({
        width: scaledWidth,
        height: scaledHeight,
      });
    }
    return this;
  }

  scaleAndPositionObjects(scale: number) {
    this.getObjects().forEach(obj => {
      this.scaleAndPositionObject(obj, scale);
    });
  }

  scaleAndPositionObject(obj: BaseFabricObject, scale: number): void {
    obj.set({
      scaleX: (obj.scaleX ?? 1) * scale,
      scaleY: (obj.scaleY ?? 1) * scale,
      left: (obj.left ?? 0) * scale,
      top: (obj.top ?? 0) * scale,
    });
    obj.setCoords();
  }

  resize(): void {
    const fabricCanvas = this;
    const backgroundImage = fabricCanvas.backgroundImage;

    let originalWidth: number;
    let originalHeight: number;

    if (backgroundImage) {
      // Use background image dimensions
      originalWidth = Math.floor(backgroundImage.width * backgroundImage.scaleX);
      originalHeight = Math.floor(backgroundImage.height * backgroundImage.scaleY);
    } else {
      // Calculate bounding box of all objects
      const objects = this.getObjects();
      if (objects.length === 0) {
        return; // Nothing to resize
      }

      let minX = Infinity,
        minY = Infinity;
      let maxX = -Infinity,
        maxY = -Infinity;

      objects.forEach(obj => {
        const bounds = obj.getBoundingRect();
        minX = Math.min(minX, bounds.left);
        minY = Math.min(minY, bounds.top);
        maxX = Math.max(maxX, bounds.left + bounds.width);
        maxY = Math.max(maxY, bounds.top + bounds.height);
      });
      originalWidth = Math.floor(maxX - minX);
      originalHeight = Math.floor(maxY - minY);
    }
    const scale = util.findScaleToFit({ width: originalWidth, height: originalHeight }, { width: this.width, height: this.height });
    if (backgroundImage) {
      backgroundImage.set({
        scaleX: (backgroundImage.scaleX ?? 1) * scale,
        scaleY: (backgroundImage.scaleY ?? 1) * scale,
        left: (backgroundImage.left ?? 0) * scale,
        top: (backgroundImage.top ?? 0) * scale,
      });
    }
    // Scale other objects
    this.scaleAndPositionObjects(scale);
    fabricCanvas.setDimensions({
      width: originalWidth * scale,
      height: originalHeight * scale,
    });
    fabricCanvas.renderAll();
  }
}
