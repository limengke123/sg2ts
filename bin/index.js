#!/usr/bin/env node

const { sg2ts } = require('../lib')
const sourceStr = process.argv.slice(2)

if (sourceStr) {
    console.log(sg2ts(sourceStr))
}

