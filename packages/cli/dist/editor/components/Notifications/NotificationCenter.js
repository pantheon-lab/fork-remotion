"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationCenter = exports.notificationCenter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Notification_1 = require("./Notification");
const container = {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    paddingTop: 20,
    pointerEvents: 'none',
};
exports.notificationCenter = (0, react_1.createRef)();
const NotificationCenter = () => {
    const [notifications, setNotifications] = (0, react_1.useState)([]);
    const onRemove = (0, react_1.useCallback)((id) => {
        setNotifications((not) => {
            return not.filter((n) => n.id !== id);
        });
    }, []);
    const addNotification = (0, react_1.useCallback)((notification) => {
        setNotifications((previousNotifications) => {
            return [...previousNotifications, notification];
        });
    }, []);
    (0, react_1.useImperativeHandle)(exports.notificationCenter, () => {
        return {
            addNotification,
        };
    });
    return ((0, jsx_runtime_1.jsx)("div", { style: container, children: notifications.map((n) => {
            return ((0, jsx_runtime_1.jsx)(Notification_1.Notification, { created: n.created, duration: n.duration, id: n.id, onRemove: onRemove, children: n.content }, n.id));
        }) }));
};
exports.NotificationCenter = NotificationCenter;
