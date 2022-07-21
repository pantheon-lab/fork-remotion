"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCloudwatchStreamUrl = void 0;
const getCloudwatchStreamUrl = ({ region, functionName, method, renderId, }) => {
    return `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:log-groups/log-group/$252Faws$252Flambda$252F${functionName}/log-events$3FfilterPattern$3D$2522method$253D${method}$252CrenderId$253D${renderId}$2522`;
};
exports.getCloudwatchStreamUrl = getCloudwatchStreamUrl;
