/**
 *
 */
import * as fabric from 'fabric';
import { GraphicCanvas } from './graphic.canvas';
import { AppEvent, AppEventType, FreeDrawingDto } from 'src';

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

  handleEvent(event: AppEvent<any>): void {
    this.graphicCanvas.isDrawingMode = false; // Disable drawing mode for all events initially
    switch (event.type) {
      case AppEventType.AddEmoji:
        this.addEmoji(event.payload);
        break;
      case AppEventType.AddText:
        this.addText(event.payload);
        break;
      case AppEventType.StartDrawing:
        this.startDrawing(event.payload);
        break;
      case AppEventType.DownloadImage:
        this.downloadImage();
        break;
      default:
        console.warn(`Unhandled event type: ${event}`);
    }
  }

  addText(payload: any) {
    const itext = new fabric.IText(payload.text, { fill: payload.color || '#000000' });
    this.graphicCanvas.addCentered(itext);
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
    console.log('Donwload');
  }
}
