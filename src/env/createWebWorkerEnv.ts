import { Environment } from './types';

export function createWebWorkerEnv(): Environment {
  const fetch = self.fetch;
  if (!fetch) throw new Error('fetch - missing fetch implementation for web worker environment');

  const readFile = () => {
    throw new Error('readFile - filesystem not available for web worker environment');
  };

  return {
    Canvas: HTMLCanvasElement,
    CanvasRenderingContext2D,
    Image: HTMLImageElement,
    ImageData,
    Video: HTMLVideoElement,
    createCanvasElement: () => document.createElement('canvas'),
    createImageElement: () => document.createElement('img'),
    createVideoElement: () => document.createElement('video'),
    fetch,
    readFile,
  };
}
