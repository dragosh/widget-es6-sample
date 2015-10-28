'use strict'

import './styles'
import { Data, OnOff, Bindings } from '../../base-ui/mixins';

let DOMClass = window.DOMClass;

export default new DOMClass({
    name: 'bb-preloader',
    with: [Data, OnOff, Bindings],
    template: `
        <div data-bind="class:changeClass(state)"></div>
    `,
    bindings: {
        state: 'loading',
        changeClass(state) {
            let classList = state ? `bb-preloader--${state}` : '';
            return `bb-preloader ${classList}`;
        }
    },
    constructor() {

    },
    setState(state) {
        this.bindings.state = state;
    }
});
