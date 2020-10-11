import * as tf from '@tensorflow/tfjs';
import { convLayer } from '../common';
export function boxPredictionLayer(x, params) {
    return tf.tidy(() => {
        const batchSize = x.shape[0];
        const boxPredictionEncoding = tf.reshape(convLayer(x, params.box_encoding_predictor), [batchSize, -1, 1, 4]);
        const classPrediction = tf.reshape(convLayer(x, params.class_predictor), [batchSize, -1, 3]);
        return {
            boxPredictionEncoding,
            classPrediction
        };
    });
}
//# sourceMappingURL=boxPredictionLayer.js.map