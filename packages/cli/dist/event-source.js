"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openEventSource = void 0;
let source = null;
const openEventSource = () => {
    source = new EventSource('/events');
    source.addEventListener('message', (event) => {
        const newEvent = JSON.parse(event.data);
        if (newEvent.type === 'new-input-props') {
            window.location.reload();
        }
    });
};
exports.openEventSource = openEventSource;
