import fs from "fs";
import path from "path";
import scanWidgets from "./scanWidgets";


const scanWidgetPackage = () => {
    const json = fs.readFileSync(path.join(process.cwd(), 'widget.json')).toString();
    const widgetPackage = JSON.parse(json);
    if (!widgetPackage["widgets"]) {
        widgetPackage["widgets"] = [];
    }
    scanWidgets().forEach((it) => {
        widgetPackage["widgets"].push(it);
    })
    return widgetPackage;
}


export default scanWidgetPackage;
