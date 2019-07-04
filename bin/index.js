#!/usr/bin/env node

'use strict';

console.log("FETCHING CLOUDFLARE STATUS", "\n");
const getCloudflareStatus = require('../lib/getCloudflareStatus');

getCloudflareStatus();