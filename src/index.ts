/**
 * @fileoverview entry point for your component library
 *
 * This is the entry point for your component library. Use this file to export utilities,
 * constants or data structure that accompany your components.
 *
 * DO NOT use this file to export your components. Instead, use the recommended approaches
 * to consume components of this package as outlined in the `README.md`.
 */

export type * from './components.d.ts';

/**
 *
 */
export enum AppEventType {
  AddText = 'addText',
  AddEmoji = 'addEmoji',
  StartDrawing = 'startDrawing',
  DownloadImage = 'downloadImage',
  AddImage = 'addImage',
}

/**
 *
 */
export interface AppEvent<T> {
  type: AppEventType;
  payload?: T;
}

/**
 *
 */
export interface FreeDrawingDto {
  brushType: string;
  brushSize: string;
  color: string;
}

/**
 *
 */
export interface GraphicTextDto {
  text: string;
  color: string;
}

export interface MediaItem {
  url: string;
}

export interface MediaGallery {
  name: string;
  images: MediaItem[];
}

/**
 *
 */
export interface GraphicDesingConfig {
  gallery: MediaGallery[];
}
