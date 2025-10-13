import { Canvas } from 'fabric';

export interface DownloadOptions {
  fileName?: string;
  format?: 'png' | 'jpeg' | 'jpg';
  quality?: number;
  multiplier?: number;
  width?: number;
  height?: number;
}

/**
 * Downloads the fabric canvas as an image file
 * @param canvas - The Fabric.js canvas instance
 * @param options - Download options
 */
export function downloadCanvasAsImage(canvas: Canvas, options: DownloadOptions = {}): void {
  const { fileName = 'canvas-image', format = 'png', quality = 1, multiplier = 1, width, height } = options;

  // Generate data URL from canvas
  const dataURL = canvas.toDataURL({
    format: format === 'jpg' ? 'jpeg' : format,
    quality: quality,
    multiplier: multiplier,
    width: width,
    height: height,
  });

  // Create download link
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${fileName}.${format}`;

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Gets the canvas as a data URL
 * @param canvas - The Fabric.js canvas instance
 * @param options - Export options
 * @returns Data URL string
 */
export function getCanvasDataURL(canvas: Canvas, options: Omit<DownloadOptions, 'fileName'> = {}): string {
  const { format = 'png', quality = 1, multiplier = 1, width, height } = options;

  return canvas.toDataURL({
    format: format === 'jpg' ? 'jpeg' : format,
    quality: quality,
    multiplier: multiplier,
    width: width,
    height: height,
  });
}

/**
 * Gets the canvas as a Blob
 * @param canvas - The Fabric.js canvas instance
 * @param options - Export options
 * @returns Promise resolving to Blob
 */
export async function getCanvasBlob(canvas: Canvas, options: Omit<DownloadOptions, 'fileName'> = {}): Promise<Blob> {
  const dataURL = getCanvasDataURL(canvas, options);

  const response = await fetch(dataURL);
  return response.blob();
}

/**
 * Downloads only the selected object as an image
 * @param canvas - The Fabric.js canvas instance
 * @param options - Download options
 */
export function downloadSelectedObject(canvas: Canvas, options: DownloadOptions = {}): void {
  const activeObject = canvas.getActiveObject();

  if (!activeObject) {
    console.warn('No object selected');
    return;
  }

  const { fileName = 'selected-object', format = 'png', quality = 1 } = options;

  // Export only the selected object
  const dataURL = activeObject.toDataURL({
    format: format === 'jpg' ? 'jpeg' : format,
    quality: quality,
  });

  // Create download link
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${fileName}.${format}`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
