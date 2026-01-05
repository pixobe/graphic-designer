/**
 *
 */
import * as fabric from 'fabric';
import { GraphicCanvas } from './graphic.canvas';
import { AppEvent, AppEventType, FreeDrawingDto, MediaItem } from 'src';
import { downloadCanvasAsImage } from '../core/download-utils';
import { ControlBuilder } from './custom-controls';

export class EventHandler {
  private graphicCanvas: GraphicCanvas;

  constructor(private el: HTMLElement, private src?: string, private data?: any) {}

  async init() {
    const canvas: HTMLCanvasElement = this.el.shadowRoot?.querySelector('canvas')!;
    if (!canvas) return;

    fabric.InteractiveFabricObject.ownDefaults.controls = ControlBuilder.build({
      delete: true,
      edit: true,
      rotate: true,
      expand: true,
    });

    this.graphicCanvas = new GraphicCanvas({
      canvas,
      config: {},
      data: this.data,
      src: this.src,
      props: { backgroundColor: '#ffffff' },
    });
    await this.graphicCanvas.render();
  }

  /**
   *
   */
  async render(data?: any): Promise<void> {
    if (data) {
      await this.graphicCanvas.loadFromJSON(data);
      this.graphicCanvas.requestRenderAll();
    }
  }

  async handleEvent(event: AppEvent<any>): Promise<void> {
    this.graphicCanvas.isDrawingMode = false;
    const payload = event.payload;
    switch (event.type) {
      case AppEventType.AddEmoji:
        this.addEmoji(payload);
        break;
      case AppEventType.AddText:
        this.addText(payload);
        break;
      case AppEventType.StartDrawing:
        this.startDrawing(payload);
        break;
      case AppEventType.DownloadImage:
        this.downloadImage();
        break;
      case AppEventType.AddImage:
        await this.addImage(payload);
        break;
      default:
        console.warn(`Unhandled event type: ${event}`);
    }
  }

  addText(payload: any) {
    const itext = new fabric.IText(payload.text, { fill: payload.stroke || '#000000' });
    this.graphicCanvas.addCentered(itext);
  }

  /**
   *
   * @param payload
   */
  async addImage(payload: MediaItem): Promise<void> {
    const image = await fabric.FabricImage.fromURL(payload.url, { crossOrigin: 'anonymous' });
    const targetWidth = 200;
    const targetHeight = 200;
    // Calculate scale to fit within 200x200 while maintaining aspect ratio
    const scaleX = targetWidth / image.width;
    const scaleY = targetHeight / image.height;
    const scale = Math.min(scaleX, scaleY);

    // Apply scale
    image.scale(scale);
    this.graphicCanvas.addCentered(image);
  }

  addEmoji(payload: any) {
    const itext = new fabric.IText(payload.native, {});
    this.graphicCanvas.addCentered(itext);
  }

  startDrawing(payload: FreeDrawingDto) {
    const canvas = this.graphicCanvas;
    canvas.isDrawingMode = true;
    switch (payload?.brushType) {
      case 'pattern': {
        canvas.freeDrawingBrush = new fabric.PatternBrush(canvas);
        break;
      }
      case 'spray': {
        canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
        break;
      }
      case 'circle': {
        canvas.freeDrawingBrush = new fabric.CircleBrush(canvas);
        break;
      }
      default: {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      }
    }
    canvas.freeDrawingBrush.color = payload.color;
    canvas.freeDrawingBrush.width = parseInt(payload.brushSize);
  }

  /**
   *
   * @param format
   * @param quality
   */
  downloadImage() {
    downloadCanvasAsImage(this.graphicCanvas, {
      fileName: 'img',
      format: 'png',
      quality: 1,
      multiplier: 2,
    });
  }

  getCanvasData(): any {
    return this.graphicCanvas.toDatalessJSON();
  }
}
