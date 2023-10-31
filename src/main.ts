import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import * as print from "@arcgis/core/rest/print";
import PrintTemplate from "@arcgis/core/rest/support/PrintTemplate";
import PrintParameters from "@arcgis/core/rest/support/PrintParameters";
import esriConfig from "@arcgis/core/config"; 
import esriId from "@arcgis/core/identity/IdentityManager";
import OAuthInfo from "@arcgis/core/identity/OAuthInfo";

import "./style.css";

// omgeving
let portalAdres = "https://mijnenterprise.local/portal"
let appId = "--"
let webmapId = "--"
let printUrl = "https://mijnenterprise.local/server/rest/services/Mijn_Custom_Print/GPServer/Export%20Web%20Map";


esriConfig.portalUrl = portalAdres

const oAuthInfo = new OAuthInfo({
  appId: appId,
  portalUrl: portalAdres
});

// onderstaande blok is nodig om de je login op te slaan in de bijlage
const storedLoginObject = localStorage.getItem("storedLogin");
  if (storedLoginObject != null) {
      esriId.initialize(JSON.parse(storedLoginObject));
  } else {
      esriId.registerOAuthInfos([oAuthInfo]);
  }
  esriId.on("credential-create", function (e) {
      localStorage.setItem("storedLogin", JSON.stringify(esriId.toJSON()));
  });

const webmap = new WebMap({
  portalItem: {
    id: webmapId
  }
});

const view = new MapView({
  container:"viewDiv",
  map: webmap
});

const printTemplate = new PrintTemplate({
  format: "PDF",
  exportOptions: {
    dpi: 300
  },
  layout: "PlaatsbepalingAVP_A4",
  layoutOptions: {
    titleText: "Print Voorbeeld",
    authorText: "Alliander NV"
  }
});

const printParams = new PrintParameters({
  view: view,
  template: printTemplate
});

function printResult(result) {
  
  // Voegt het token toe aan de url, SSO werkt niet op deze request.
  result.url = result.url + "/?token=" + JSON.parse(localStorage.storedLogin).credentials[0].token;
  console.log(result.url)
  window.open(result.url, "mozillaTab");
}

function printError(err) {
  console.log("Something broke: ", err);
}

function printExecute(result) {
  print.execute(printUrl, printParams, {
      setTimeout: 6000
    }).catch(printError).then(printResult);
}

view.on("double-click", function(event){
  console.log("double-click event on X: " + event.x + " and Y:" + event.y + "\n we gaan nu printen. Wacht eventjes, check je popUp blocker...");

  printExecute(event);

});

view.on("focus", function(f){
  const myToken = JSON.parse(localStorage.storedLogin).credentials[0].token;
  console.log("jouw token is: " + myToken);
});