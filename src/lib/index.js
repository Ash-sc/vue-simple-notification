import Notification from './Notification';
import moment from 'moment'

// let defaultDuration = 3;
let messageInstance;

function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance();

    return messageInstance;
}

function notice(content, duration = 3, type, onClose) {
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
    // config (options) {
    //     if (options.top) {
    //         top = options.top;
    //     }
    //     if (options.duration) {
    //         defaultDuration = options.duration;
    //     }
    // },
    destroy() {
        let instance = getMessageInstance();
        messageInstance = null;
        instance.destroy();
    }
}