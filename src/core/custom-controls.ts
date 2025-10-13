import * as fabric from 'fabric';

/**
 * Base class for custom Fabric.js controls
 */
abstract class CustomControl {
  protected iconSize: { width: number; height: number };

  constructor(width: number = 24, height: number = 24) {
    this.iconSize = { width, height };
  }

  protected createRenderFunction(iconSrc: string) {
    const image = document.createElement('img');
    image.src = iconSrc;
    const { width, height } = this.iconSize;

    return (ctx: CanvasRenderingContext2D, left: number, top: number, _styleOverride: any, fabricObject: fabric.FabricObject) => {
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(image, -width / 2, -height / 2, width, height);
      ctx.restore();
    };
  }

  abstract getControl(): fabric.Control;
}

/**
 * Delete control
 */
class DeleteControl extends CustomControl {
  private static readonly ICON =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  getControl(): fabric.Control {
    return new fabric.Control({
      x: -0.5,
      y: -0.5,
      cursorStyle: 'pointer',
      mouseUpHandler: this.handleMouseUp,
      render: this.createRenderFunction(DeleteControl.ICON),
    });
  }

  private handleMouseUp(_eventData: fabric.TPointerEvent, transform: fabric.Transform): boolean {
    const canvas = transform.target.canvas!;
    const event = { target: transform.target };
    canvas.remove(transform.target);
    return true;
  }
}

/**
 * Edit control
 */
class EditControl extends CustomControl {
  private static readonly ICON =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgaGVpZ2h0PSIyNCIgd2lkdGg9IjI0IiBpZD0iU3R5bHVzLUZpbGwtLVN0cmVhbWxpbmUtT3V0bGluZWQtRmlsbC1NYXRlcmlhbCI+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiMwMGRkMDAiIC8+CiAgICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNNC4xNzUyMTUgMjAuOTk5OGMtMC4zNSAwLjA4MzM1IC0wLjY1NDE2NSAtMC4wMDQxNSAtMC45MTI1IC0wLjI2MjVzLTAuMzQ1ODM1IC0wLjU2MjUgLTAuMjYyNSAtMC45MTI1bDAuOSAtNC4yMjUgNC40OTk5ODUgNC41IC00LjIyNDk4NSAwLjlabTUuNTI0OTg1IC0xLjc1IC00Ljk0OTk4NSAtNC45NUwxNS44MjUyIDMuMjI0ODA1YzAuMjgzMzUgLTAuMjgzMzM1IDAuNjMzMzUgLTAuNDI1IDEuMDUgLTAuNDI1IDAuNDE2NyAwIDAuNzY2NyAwLjE0MTY2NSAxLjA1IDAuNDI1bDIuODUgMi44NDk5OTVjMC4yODMzNSAwLjI4MzM1IDAuNDI1IDAuNjMzMzUgMC40MjUgMS4wNSAwIDAuNDE2NjUgLTAuMTQxNjUgMC43NjY2NSAtMC40MjUgMS4wNWwtMTEuMDc1IDExLjA3NVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNSwgMi41KSBzY2FsZSgwLjgpIi8+Cjwvc3ZnPg==';

  getControl(): fabric.Control {
    return new fabric.Control({
      x: -0.5,
      y: 0.5,
      cursorStyle: 'pointer',
      mouseUpHandler: this.handleMouseUp,
      render: this.createRenderFunction(EditControl.ICON),
    });
  }

  private handleMouseUp(_eventData: fabric.TPointerEvent, transform: fabric.Transform): boolean {
    const canvas = transform.target.canvas;
    const event = { target: transform.target };
    canvas?.fire('on:edit', event);
    return true;
  }
}

/**
 * Rotate control
 */
class RotateControl extends CustomControl {
  private static readonly ICON =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgaGVpZ2h0PSIyNCIgd2lkdGg9IjI0IiA+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiMwMDdhY2MiIC8+CiAgPGcgdHJhbnNmb3JtPSJzY2FsZSgwLjg2KSB0cmFuc2xhdGUoMS43LCAxLjcpIj4KICAgIDxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0xMi45IDE5LjIwNSA0Ljc3NSAxMS4wODg0NWMtMC4zIC0wLjMzMyAtMC40NSAtMC43MTU5IC0wLjQ1IC0xLjE0ODggMCAtMC40MzI5IDAuMTUgLTAuODE1OCAwLjQ1IC0xLjE0ODhsNC4xNSAtNC4xMjA3MTVjMC4zIC0wLjMzMjk4NSAwLjY3NSAtMC40OTk0OCAxLjEyNSAtMC40OTk0OCAwLjQ1IDAgMC44NDE2NSAwLjE2NjQ5NSAxLjE3NSAwLjQ5OTQ4TDE5LjM1IDEyLjc4NjdjMC4zMTY2NSAwLjMxNjMgMC40NzUgMC42OTkyNSAwLjQ3NSAxLjE0ODggMCAwLjQ0OTUgLTAuMTU4MzUgMC44MzI0NSAtMC40NzUgMS4xNDg4TDE1LjIgMTkuMjA1Yy0wLjMgMC4zMzMgLTAuNjc1IDAuNDk5NDUgLTEuMTI1IDAuNDk5NDUgLTAuNDUgMCAtMC44NDE2NSAtMC4xNjY0NSAtMS4xNzUgLTAuNDk5NDVaTTExLjk1IDI0Yy0xLjY1IDAgLTMuMiAtMC4zMTIyIC00LjY1IC0wLjkzNjU1IC0xLjQ1IC0wLjYyNDMgLTIuNzE2NjY1IC0xLjQ4MTc1IC0zLjggLTIuNTcyM3MtMS45Mzc1IC0yLjM2MDA1IC0yLjU2MjUgLTMuODA4NTVDMC4zMTI1IDE1LjIzNDE1IDAgMTMuNjg1NzUgMCAxMi4wMzc0NWgxLjVjMCAxLjMzMTk1IDAuMjM3NSAyLjU5MzE1IDAuNzEyNSAzLjc4MzU1IDAuNDc1IDEuMTkwNDUgMS4xMjkxNjUgMi4yNDc3IDEuOTYyNSAzLjE3MTcgMC44MzMzNSAwLjkyNDA1IDEuODIwODUgMS42Nzc0NSAyLjk2MjUgMi4yNjAxNSAxLjE0MTY1IDAuNTgyNzUgMi4zNzA4NSAwLjk0MDcgMy42ODc1IDEuMDczOWwtMy4yNSAtMy4yNDY2NSAxLjA3NSAtMS4wNzM4NSA1LjcgNS42OTQwNWMtMC4zODMzNSAwLjExNjU1IC0wLjc3OTE1IDAuMTk1NjUgLTEuMTg3NSAwLjIzNzI1QzEyLjc1NDE1IDIzLjk3OTIgMTIuMzUgMjQgMTEuOTUgMjRaTTIyLjUgMTIuMDM3NDVjMCAtMS4zMzE5NSAtMC4yMzMzNSAtMi41OTMxIC0wLjcgLTMuNzgzNTUgLTAuNDY2NjUgLTEuMTkwNCAtMS4xMTI1IC0yLjI1MTggLTEuOTM3NSAtMy4xODQyIC0wLjgyNSAtMC45MzIzNDUgLTEuODA0MTUgLTEuNjk0MDUgLTIuOTM3NSAtMi4yODUxIC0xLjEzMzM1IC0wLjU5MTA1IC0yLjM1ODM1IC0wLjk1MzE3NSAtMy42NzUgLTEuMDg2MzdsMy4yIDMuMTk2NjcgLTEuMDc1IDEuMDczOUw5LjY3NSAwLjI3NDcxNGMwLjM4MzM1IC0wLjA5OTg5NiAwLjc2MjUgLTAuMTcwNjU1NSAxLjEzNzUgLTAuMjEyMjc5QzExLjE4NzUgMC4wMjA4MTE2NSAxMS41NjY2NSAwIDExLjk1IDBjMS42NjY2NSAwIDMuMjI5MTUgMC4zMTYzMzcgNC42ODc1IDAuOTQ5MDEgMS40NTgzNSAwLjYzMjY3NSAyLjczMzM1IDEuNDk0MjggMy44MjUgMi41ODQ4MVMyMi40MTY2NSA1Ljg5OCAyMy4wNSA3LjM1NDg1YzAuNjMzMzUgMS40NTY4IDAuOTUgMy4wMTc3IDAuOTUgNC42ODI2aC0xLjVaIi8+CiAgPC9nPgo8L3N2Zz4K';

  getControl(): fabric.Control {
    return new fabric.Control({
      x: 0.5,
      y: -0.5,
      actionHandler: fabric.controlsUtils.rotationWithSnapping,
      withConnection: false,
      actionName: 'rotate',
      render: this.createRenderFunction(RotateControl.ICON),
    });
  }
}

/**
 * Expand/Scale control
 */
class ExpandControl extends CustomControl {
  private static readonly ICON =
    'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20height%3D%2224%22%20width%3D%2224%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%2212%22%20fill%3D%22%23ffffff%22%2F%3E%3Cpath%20fill%3D%22%23000000%22%20stroke-width%3D%220.5%22%20%20%20%20d%3D%22M18.6%2018.6V12.6h-1.2v3.96L7.44%206.84H10.2V5.4H5.4v6h1.2V7.44L16.56%2017.16H13.8v1.2H18.6Z%22%2F%3E%3C%2Fsvg%3E';

  getControl(): fabric.Control {
    return new fabric.Control({
      x: 0.5,
      y: 0.5,
      actionHandler: fabric.controlsUtils.scalingEqually,
      withConnection: false,
      actionName: 'scale',
      render: this.createRenderFunction(ExpandControl.ICON),
      cursorStyle: 'nwse-resize',
    });
  }
}

/**
 * Scale X or Skew Y control
 */
class ScaleXSkewYControl extends CustomControl {
  private static readonly ICON =
    'data:image/svg+xml;base64,Cgo8c3ZnIHZpZXdCb3g9IjAgMCA1MCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CsKgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSIxMDAiIHJ4PSI1MCIgcnk9IjI1IiBmaWxsPSJva2xjaCg5My4yJSAwLjAzMiAyNTUuNTg1KSIgLz4KPC9zdmc+Cg==';

  constructor(private x: number = 0.5) {
    super(20, 40);
  }

  getControl(): fabric.Control {
    return new fabric.Control({
      x: this.x,
      y: 0,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
      getActionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: this.createRenderFunction(ScaleXSkewYControl.ICON),
    });
  }
}

/**
 * Scale Y or Skew X control
 */
class ScaleYSkewXControl extends CustomControl {
  private static readonly ICON =
    'data:image/svg+xml;base64,Cgo8c3ZnIHZpZXdCb3g9IjAgMCAxMDAgNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CsKgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIHJ4PSIyNSIgcnk9IjUwIiBmaWxsPSJva2xjaCg5My4yJSAwLjAzMiAyNTUuNTg1KSIgLz4KPC9zdmc+Cg==';

  constructor(private y: number = 0.5) {
    super(40, 20);
  }

  getControl(): fabric.Control {
    return new fabric.Control({
      x: 0,
      y: this.y,
      cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
      actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
      getActionName: fabric.controlsUtils.scaleOrSkewActionName,
      render: this.createRenderFunction(ScaleYSkewXControl.ICON),
    });
  }
}

/**
 * Control configuration interface
 */
export interface ControlConfig {
  delete?: boolean;
  expand?: boolean;
  edit?: boolean;
  rotate?: boolean;
  scalingY?: boolean;
  scalingX?: boolean;
}

/**
 * Control builder for creating custom Fabric.js controls
 */
export class ControlBuilder {
  private static readonly DEFAULT_CONFIG: ControlConfig = {
    delete: true,
    rotate: true,
    edit: true,
    expand: true,
    scalingY: false,
    scalingX: false,
  };

  static build(config: ControlConfig = this.DEFAULT_CONFIG): Record<string, fabric.Control> {
    const controls: Record<string, fabric.Control> = {};

    if (config.delete) {
      controls.tl = new DeleteControl().getControl();
    }
    if (config.expand) {
      controls.br = new ExpandControl().getControl();
    }
    if (config.edit) {
      controls.bl = new EditControl().getControl();
    }
    if (config.rotate) {
      controls.tr = new RotateControl().getControl();
    }
    if (config.scalingY) {
      controls.mb = new ScaleYSkewXControl(0.5).getControl();
      controls.mt = new ScaleYSkewXControl(-0.5).getControl();
    }
    if (config.scalingX) {
      controls.mr = new ScaleXSkewYControl(0.5).getControl();
      controls.ml = new ScaleXSkewYControl(-0.5).getControl();
    }

    return controls;
  }

  static applyToPrototype(config?: ControlConfig): void {
    fabric.FabricObject.prototype.controls = this.build(config);
  }
}
