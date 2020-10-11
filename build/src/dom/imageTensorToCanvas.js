import * as tf from '@tensorflow/tfjs';
import { env } from '../env';
import { isTensor4D } from '../utils';
export async function imageTensorToCanvas(imgTensor, canvas) {
    const targetCanvas = canvas || env.getEnv().createCanvasElement();
    const [height, width, numChannels] = imgTensor.shape.slice(isTensor4D(imgTensor) ? 1 : 0);
    const imgTensor3D = tf.tidy(() => imgTensor.as3D(height, width, numChannels).toInt());
    await tf.browser.toPixels(imgTensor3D, targetCanvas);
    imgTensor3D.dispose();
    return targetCanvas;
}
//# sourceMappingURL=imageTensorToCanvas.js.map