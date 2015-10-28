'use strict'
const context = require.context('./', true, /.+\.[sS]pec\.js?$/)
context.keys().forEach(context)

