import { Environment } from './types';

export function createWebWorkerEnv(): Environment {
  const fetch = self.fetch;
  if (!fetch) throw new Error('fetch - missing fetch implementation for browser environment');

  const readFile = () => {
    throw new Error('readFile - filesystem not available for browser environment');
  };

  class Generic {}

  const Canvas: (new () => HTMLCanvasElement) = (global as any)['Canvas'] || global.HTMLCanvasElement;
  const Image = global.Image || global.HTMLImageElement;
  const Video: (new () => HTMLVideoElement) = (global as any)['Video'] || global.HTMLVideoElement;

  const createCanvasElement = () => {
    if (Canvas) return new Canvas();
    throw new Error('createCanvasElement - missing Canvas implementation for nodejs environment');
  };

  const createImageElement = () => {
    if (Image) return new Image();
    throw new Error('createImageElement - missing Image implementation for nodejs environment');
  };

  const createVideoElement = () => {
    if (Video) return new Video();
    throw new Error('createVideoElement - missing Video implementation for nodejs environment');
  };

  return {
    Canvas: Canvas || Generic,
    CanvasRenderingContext2D: global.CanvasRenderingContext2D || Generic,
    Image: Image || Generic,
    ImageData: global.ImageData || Generic,
    Video: global.HTMLVideoElement || Generic,
    createCanvasElement,
    createImageElement,
    createVideoElement,
    fetch,
    readFile,
  };
}
