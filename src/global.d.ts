import * as fabric from 'fabric';

declare module 'fabric' {
  interface CanvasEvents {
    'on:edit': Partial<fabric.TEvent> & {
      target: fabric.FabricObject;
      data?: any;
    };
    'on:delete': Partial<fabric.TEvent> & {
      target: fabric.FabricObject;
      data?: any;
    };
    'boundary:breach': Partial<fabric.TEvent> & {
      target: fabric.FabricObject;
      breached: boolean;
    };
  }

  interface FabricObject {
    id: string;
  }

  interface FabricObjectProps {
    id: string;
  }
}
