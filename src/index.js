/**
 * ------------------------------------------------------------------------
 * Entry file
 * ------------------------------------------------------------------------
 */

import './styles' // widget styles
import { bus, log, errors, utils } from './externals/base'; // Low-level application modules
import { accounts } from './externals/api'; // api modules
import { bbPreloader, bbAccountsListItem } from './externals/ui'; // ui modules
// import { camelCase } from 'lodash/string';
// import { map } from 'lodash/collection';
// import Immutable from 'immutable';
// Templates
import accountListTpl from './templates/accounts-list.hbs';


function checkStatus(response) {
    if (response.status < 200 && response.status >= 300) {
        throw new Error(response.statusText);
    }
    return response;
}

function parseJSON(response) {
    console.info('parseJSON', response);
    return response.json()
}

function enhanceData(apiData) {
    let data = {
        currentAccount: apiData['current-account'].map((val) => {
            return { name: val.alias }
        }),
        card: apiData['card'].map((val) => {
            return { name: val.alias }
        })
    };
    return data;
}

function bindToView(data) {
    let htmlBody = this.widget.body;
    var html = accountListTpl({ accounts: data.currentAccount });
    // console.info(html);
    // htmlBody.html(html);
    // console.log(html, data, htmlBody);
    // debugger;
    let account = htmlBody.query('bb-accounts-list-item');
    this.preloader = htmlBody.query('bb-preloader');
    let listItem = new bbAccountsListItem();

    console.log("listItem:;", listItem);
    return data;
}

function handleError(error) {
    console.error('Something went wrong!', error)
    return error;
}

function done() {
    console.info('done', this);
    console.timeEnd(this.widget.id);
    this.preloader.setState('done');
}

function WidgetApp(widget) {
    console.time(widget.id);
    let obj = Object.create(WidgetApp.prototype);
    obj.widget = widget;
    return obj;
}

WidgetApp.prototype = {
    /**
     * Initialize method
     * @return {Object} App instance
     */
    init() {
        fetch(this.widget.getPreference('accountsEndpoint'))
           .then(checkStatus)
           .then(parseJSON)
           .then(enhanceData)
           .then(bindToView.bind(this))
           .then(done.bind(this))
           .catch(handleError);
        return this;
    },
    /**
     * Clean up method
     * @return {Object} remove event handlers, closures helpers ...etc
     */
    destroy() {

    }
};

export default WidgetApp;
