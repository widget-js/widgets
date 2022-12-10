const widgets = require('./requireWidgets');
const path = require("path");
const widgetPackage = require(path.join(process.cwd(), 'widget.json'));
widgetPackage["widgets"] = widgets;
module.exports = widgetPackage;

