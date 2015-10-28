'use strict'
let DOMClass = window.DOMClass;
export const Bindings = DOMClass.bindings;

export const Data = {
    data(key, value = null) {
        let v;
        let strKey = String(key);
        let k = `data-${strKey}`.replace(
            /([a-z])([A-Z])/g, (match, length, str) => {
                return `${length}-${str.toLowerCase()}`;
            }
        ).toLowerCase();
        if (arguments.length === 2) {
            if (value === null) {
                this.removeAttribute(k);
            } else {
                this.setAttribute(k, JSON.stringify(value));
            }
        } else {
            v = this.getAttribute(k);
            return v === null ? v : JSON.parse(v);
        }
    }
};

// A shortcut for adding and removing events
export const OnOff = {
    on(...args) {
        this.addEventListener(args);
        return this;
    },
    off(...args) {
        this.removeEventListener(args);
        return this;
    }
};

