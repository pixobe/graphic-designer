interface HTMLElementContext {
  el: HTMLElement;
}

/**
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 */
export function ResizeHandler(_t: any, _p: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  let timeoutId: number | null = null;

  descriptor.value = function (this: HTMLElementContext, ...args: any[]) {
    const el = this.el;
    const observer = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      width < 768 ? el.classList.add('sm') : el.classList.remove('sm');
    });
    const debouncedObserve = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        observer.observe(el);
      }, 100);
    };
    requestAnimationFrame(() => {
      debouncedObserve();
    });
    return originalMethod.apply(this, args);
  };
}

/**
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 */
export function ResizeCanvas(_t: any, _p: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  function resize(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const wrapper = canvas.closest('.canvas-wrapper')!;
    canvas.width = Math.floor(wrapper.clientWidth);
    canvas.height = Math.floor(wrapper.clientHeight);
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
    return canvas;
  }
  descriptor.value = function (this: HTMLElementContext, ...args: any[]) {
    const canvasList = this.el.shadowRoot?.querySelectorAll('canvas') as NodeListOf<HTMLCanvasElement>;
    canvasList.forEach(resize);
    return originalMethod.apply(this, args);
  };
}

export function ensureJsonObject(value: string | object): any {
  // 1. Check if the value is a string
  let parsedValue = value;
  if (typeof value === 'string') {
    try {
      // 2. Attempt to parse the string
      parsedValue = JSON.parse(value);
    } catch (error) {
      // 4. Handle exceptions
      console.warn('Failed to parse this.value as JSON. Keeping original string.', error);
      // Logic continues with the original string value intact
    }
  }
  return parsedValue;
}
