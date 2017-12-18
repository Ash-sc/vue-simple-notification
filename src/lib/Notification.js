import VueSimpleNotification from './template.vue';
import Vue from 'vue';

const Notification = {};

Notification.newInstance = properties => {
    const _props = properties || {};

    let props = '';
    Object.keys(_props).forEach(prop => {
        props += ' :' + prop + '=' + prop;
    });

    const div = document.createElement('div');
    div.innerHTML = `<vue-simple-notification${props}></vue-simple-notification>`;
    document.body.appendChild(div);

    const vueSimpleNotification = new Vue({
        el: div,
        data: _props,
        components: { VueSimpleNotification }
    }).$children[0];

    return {
        notice(noticeProps) {
            vueSimpleNotification.add(noticeProps);
        },
        remove(key) {
            vueSimpleNotification.close(key);
        },
        config(obj) {
            vueSimpleNotification.config(obj);
        },
        component: vueSimpleNotification,
        destroy() {
            document.body.removeChild(div);
        }
    }
};

export default Notification;