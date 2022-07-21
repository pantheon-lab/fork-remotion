"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hosted_layers_1 = require("../../shared/hosted-layers");
test('All hosted layers should match ARN', () => {
    Object.keys(hosted_layers_1.hostedLayers).forEach((arch) => {
        Object.values(hosted_layers_1.hostedLayers[arch]).forEach((h) => {
            h.forEach(({ layerArn }) => {
                expect(layerArn).toMatch(new RegExp(hosted_layers_1.REMOTION_HOSTED_LAYER_ARN.replace(/\*/g, '(.*)')));
            });
        });
    });
});
