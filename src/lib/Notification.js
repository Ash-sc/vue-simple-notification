import VueSimpleNotification from './template.vue';
import Vue from 'vue';

Notification.newInstance = properties => {
    const _props = properties || {};

    let props = '';
    Object.keys(_props).forEach(prop => {
        props += ' :' + prop + '=' + prop;
    });

    const div = document.createElement('div');
    div.innerHTML = `<vue-simple-notification${props}></vue-simple-notification>`;
    document.body.appendChild(div);

    const vuesimplenotification = new Vue({
        el: div,
        data: _props,
        components: { VueSimpleNotification }
    }).$children[0];

    return {
        notice(noticeProps) {
          vuesimplenotification.add(noticeProps);
        },
        remove(key) {
          vuesimplenotification.close(key);
        },
        component: vuesimplenotification,
        destroy() {
            document.body.removeChild(div);
        }
    }
};

export default Notification;