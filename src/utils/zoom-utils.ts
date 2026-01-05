import { Canvas as FabricCanvas, Point } from 'fabric';

export function setupPanAndZoom(canvas: FabricCanvas): void {
  canvas.upperCanvasEl.style.touchAction = 'none';

  const minZoom = 1;
  const maxZoom = 3;

  const clampZoom = (zoom: number, min = minZoom, max = maxZoom) => Math.min(Math.max(zoom, min), max);

  const adjustViewport = (zoom: number) => {
    const vpt = canvas.viewportTransform;
    if (!vpt) return;
    if (zoom <= 1) {
      canvas.absolutePan(new Point(0, 0));
    } else {
      const maxOffsetX = canvas.getWidth() - 1000 * zoom;
      const maxOffsetY = canvas.getHeight() - 1000 * zoom;
      vpt[4] = Math.min(0, Math.max(vpt[4], maxOffsetX));
      vpt[5] = Math.min(0, Math.max(vpt[5], maxOffsetY));
    }
  };

  canvas.on('mouse:wheel', opt => {
    const event = opt.e;
    let zoom = canvas.getZoom() * Math.pow(0.999, event.deltaY);
    zoom = clampZoom(zoom);

    const point = new Point(event.offsetX, event.offsetY);
    canvas.zoomToPoint(point, zoom);

    event.preventDefault();
    event.stopPropagation();

    adjustViewport(zoom);
    canvas.requestRenderAll();
  });

  let isPinching = false;
  let isDragging = false;
  let initialDistance = 0;
  let lastZoom = canvas.getZoom();
  let lastTouch: Point | null = null;
  let canPan = true;

  const getDistance = (t1: Touch, t2: Touch) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const upperCanvasEl = canvas.upperCanvasEl;

  upperCanvasEl.addEventListener(
    'touchstart',
    (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        isPinching = true;
        initialDistance = getDistance(e.touches[0], e.touches[1]);
        lastZoom = canvas.getZoom();
      } else if (e.touches.length === 1 && !isPinching) {
        e.preventDefault();
        const touch = e.touches[0];
        lastTouch = new Point(touch.clientX, touch.clientY);
        const target = canvas.findTarget(e as any);
        canPan = !target && canvas.getZoom() > 1; // Allow panning only if not touching an object and zoomed in
        isDragging = canPan;
      }
    },
    { passive: false },
  );

  upperCanvasEl.addEventListener(
    'touchmove',
    (e: TouchEvent) => {
      if (isPinching && e.touches.length === 2) {
        e.preventDefault();
        const currentDistance = getDistance(e.touches[0], e.touches[1]);
        const zoomFactor = currentDistance / initialDistance;

        let newZoom = clampZoom(lastZoom * zoomFactor);

        const rect = upperCanvasEl.getBoundingClientRect();
        const center = new Point((e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left, (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top);

        canvas.zoomToPoint(center, newZoom);
        adjustViewport(newZoom);
        canvas.requestRenderAll();
      } else if (isDragging && canPan && e.touches.length === 1) {
        e.preventDefault();
        const touch = e.touches[0];
        const currentTouch = new Point(touch.clientX, touch.clientY);

        if (lastTouch) {
          const delta = new Point(currentTouch.x - lastTouch.x, currentTouch.y - lastTouch.y);
          canvas.relativePan(delta);
        }

        lastTouch = currentTouch;
        canvas.requestRenderAll();
      }
    },
    { passive: false },
  );

  const resetTouchState = () => {
    isPinching = false;
    isDragging = false;
    lastTouch = null;
    canPan = true;
  };

  upperCanvasEl.addEventListener('touchend', resetTouchState);
  upperCanvasEl.addEventListener('touchcancel', resetTouchState);
}
