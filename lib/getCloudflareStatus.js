#!/usr/bin/env node

'use strict';

const axios = require('axios');
const parser = require('xml2json');
const striptags = require('striptags');
const timeAgo = require('node-time-ago');

const CLOUDFLARE_STATUS_RSS = `https://www.cloudflarestatus.com/history.atom`;

const getCloudflareStatus = async () => {
    const response = await axios.get(CLOUDFLARE_STATUS_RSS);
    const xml = response.data;
    const jsonString = parser.toJson(xml);
    const json = JSON.parse(jsonString);
    const { feed } = json;
    const { entry } = feed;
    
    entry.reverse().map(e => {
        const { title, content, published } = e;
        let titleBar = `=`;
        const publishedDate = timeAgo(published);
        const fullTitle = `${publishedDate.toUpperCase()} : ${title}`;
        fullTitle.split('').map(tl => titleBar = titleBar + `=`);
        console.log("\n");
        console.log(titleBar);
        console.log(fullTitle);
        console.log(titleBar);
        const html = content['$t'];
        const cleanhtml = striptags(html);
        console.log(cleanhtml);
        console.log(titleBar);
    });

    console.log("\n")
    console.log("END OF REPORT");

}

module.exports = getCloudflareStatus

