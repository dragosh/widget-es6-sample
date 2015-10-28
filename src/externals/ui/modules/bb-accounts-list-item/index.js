'use strict'

import './styles'
import { Data, OnOff, Bindings } from '../../base-ui/mixins';

let DOMClass = window.DOMClass;

export default new DOMClass({
    name: 'bb-accounts-list-item',
    with: [Data, OnOff, Bindings],
    template: `
        <div>{{name}}</div>
    `,
    bindings: {

    },
    onAttached: function() {
        //console.log('attached', arguments);
    },
    // optional, alias for detachedCallback
    onDetached: function() {
        //console.log('detached');
    },
    // optional, alias for attributeChangedCallback
    onChanged: function(name, prev, curr) {
        //console.log('changed', arguments);
    },
    constructor(params) {
        let account = this.data('account') || {};
        this.bindings.account =  data.account || '';
    }
});
