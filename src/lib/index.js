import Notification from './Notification';
import moment from 'moment'

let defaultDuration = 3;
let messageInstance;

function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance();

    return messageInstance;
}

function notice(content, duration = defaultDuration, type, onClose) {
    if (!onClose) {
        onClose = function () {}
    }

    let instance = getMessageInstance();

    instance.notice({
        content,
        type,
        closeTime: moment().add(duration, 's').format('x'),
        'on-close': onClose
    });
}

export default {
    info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose);
    },
    success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose);
    },
    warning(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose);
    },
    error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose);
    },
    // 配置项
    config (options) {
        const positionArr = ['top-left', 'top-center', 'top-right', 'center', 'bottom-left', 'bottom-center', 'bottom-right'];
        const bubblingArr = ['up', 'down'];
        if (options.position) {
            const configObj = {};
            if (positionArr.indexOf(options.position) >= 0) {
                configObj.position = options.position;
            }
            if (bubblingArr.indexOf(options.bubbling) >= 0) {
                configObj.bubbling = options.bubbling;
            }
            if (typeof options.closeBtn === 'boolean') {
                configObj.closeBtn = options.closeBtn;
            }
            let instance = getMessageInstance();
            instance.config(configObj);
        }
        if (options.duration) {
            defaultDuration = options.duration;
        }
    },
    destroy() {
        let instance = getMessageInstance();
        messageInstance = null;
        instance.destroy();
    }
}