# Esri REST print with token issue

This repo is constructed from the template https://github.com/Esri/jsapi-resources/tree/main/esm-samples/jsapi-vite-ts

## Purpose

This repository is a sample to demonstrate that there is a bug in the Javascript API.
Regarding the `esri/rest/print`, after setting the `virtualDirsSecurityEnabled` to true on our Enterprise server.

## Get Started

Set your `virtualDirsSecurityEnabled` to true according to the manual: 
https://developers.arcgis.com/rest/enterprise-administration/server/securityconfig.htm

Clone this repo.

Edit the `./src/main.ts` file. Edit the parameters on 
`portalAdres`
`appId`
`webmapId`
`printUrl`

Run `npm install` and then `npm run dev`

double click on the map, it triggers the print action.

See, not working...
The print is executed, but url cannot be opened. You do not have a token to open the url.

If you don't see anything showing up. Check your ad blocker, or click on the link on the console (F12 for dev-tools)

## Resolution

Uncomment the lines 27..35 and 68
If you want to see your own token in the console uncomment also 90..93