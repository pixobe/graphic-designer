/**
 *
 */
import * as fabric from 'fabric';
import { GraphicCanvas } from './graphic.canvas';
import { AppEvent, AppEventType, FreeDrawingDto, MediaItem } from 'src';
import { downloadCanvasAsImage } from '../core/download-utils';

export class EventHandler {
  private el: HTMLElement;
  private src?: string;
  private graphicCanvas: GraphicCanvas;

  constructor(el: HTMLElement, src?: string) {
    this.el = el;
    this.src = src;
  }

  init() {
    const canvas: HTMLCanvasElement = this.el.shadowRoot?.querySelector('canvas')!;
    if (!canvas) return;
    this.graphicCanvas = new GraphicCanvas({
      canvas,
      config: {},
      src: this.src,
      controlConfig: {
        delete: true,
        edit: true,
        rotate: true,
        expand: true,
      },
    });
    return this.graphicCanvas.renderBg();
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
    const itext = new fabric.IText(payload.text, { fill: payload.color || '#000000' });
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
    canvas.freeDrawingBrush.width = payload.brushSize;
  }

  /**
   *
   * @param format
   * @param quality
   */
  downloadImage() {
    downloadCanvasAsImage(this.graphicCanvas, {
      fileName: 'my-design',
      format: 'png',
      quality: 1,
      multiplier: 2, // 2x resolution for higher quality
    });
  }

  getCanvasData(): any {
    return this.graphicCanvas.toDatalessJSON();
  }
}
