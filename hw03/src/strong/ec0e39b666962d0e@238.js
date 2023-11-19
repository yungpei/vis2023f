import define1 from "./e93997d5089d7165@2303.js";

function _1(md){return(
md`# HW03 Strong baseline (4pt)`
)}

function _colorset(){return(
Object({
  北部地區: [
    "#BFF7E5",
    "#93EEC7",
    "#6CE5A8",
    "#4DD68E",
    "#2DC46E",
    "#25A55C",
    "#19854C",
    "#0E6837"
  ],
  中部地區: [
    "#CDE6FC",
    "#A1C9F5",
    "#84BAEF",
    "#67A4EB",
    "#4A8FE7",
    "#3C79CF",
    "#1F4E9F",
    "#14438E"
  ],
  南部地區: [
    "#FEF9E6",
    "#FDECB3",
    "#FEDF7C",
    "#FACB34",
    "#F9BE01",
    "#C79801",
    "#957201",
    "#644C00"
  ],
  東部地區: [
    "#D2D6D8",
    "#B0B5B9",
    "#8D959B",
    "#6B747C",
    "#48545D",
    "#3A434A",
    "#2B3238",
    "#1D2225"
  ]
})
)}

function _thresholdDomain(){return(
[40, 45, 50, 55, 60, 65, 70]
)}

function _coloredRegion(colorset){return(
Object.keys(colorset).filter((d) => d !== "東部地區")
)}

function _thresholdScale(coloredRegion,d3,thresholdDomain,colorset){return(
function (county) {
  let scaleRegion;
  if (!coloredRegion.includes(county)) {
    scaleRegion = "東部地區";
  } else {
    scaleRegion = county;
  }
  const colorScale = d3
    .scaleThreshold()
    .domain(thresholdDomain)
    .range(colorset[scaleRegion]);

  return colorScale;
}
)}

function _bgColor(Inputs){return(
Inputs.color({ label: "background color", value: "#dde6ee" })
)}

function _strokeColor(Inputs){return(
Inputs.color({ label: "stroke color", value: "#FFFFFF" })
)}

function _strokeOpacity(Inputs){return(
Inputs.range([0, 1], {
  step: 0.1,
  label: "stroke opacity"
})
)}

function _taiwan(taiwanMap){return(
taiwanMap(300, 260, -0.6, -0.7, 3500)
)}

function _taiwanMap(d3,topojson,tw,DOM,bgColor,strokeColor,strokeOpacity,data){return(
(width, height, offsetX, offsetY, scale) => {
  offsetX = offsetX + 0.85;

  const bboxCenter = (bbox) => [
    (bbox[0] + bbox[2]) / 2 + offsetX,
    (bbox[1] + bbox[3]) / 2 + offsetY
  ];
  const projection = d3
    .geoMercator()
    .center(bboxCenter(topojson.bbox(tw)))
    .translate([width / 2, height / 2])
    .scale(scale);

  const path = d3.geoPath().projection(projection);

  const svg = d3
    .select(DOM.svg(width, height))
    .style("width", "100%")
    .style("height", "auto")
    .style("background-color", bgColor);

  const details = svg
    .append("g")
    .selectAll("path")
    .data(topojson.feature(tw, tw.objects.towns).features);

  svg
    .append("path")
    .datum(topojson.mesh(tw, tw.objects.counties, (a, b) => a !== b))
    .attr("fill", "none")
    .attr("stroke", strokeColor)
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 0.5)
    .attr("opacity", strokeOpacity)
    .attr("d", path);
  
  details
    .enter()
    .append("path")
    .attr("fill", (d) => {
      const townData = data.find(
        (t) =>
          t.county === d.properties.COUNTYNAME &&
          t["county"].replace("　", "") === d.properties.TOWNNAME
      );
      //return thresholdScale(countyData.county)(+townData.votes_rate * 100);
    })
    .attr("d", path);
  

  svg.append("g");
 
  return svg.node();
}
)}

function _data(FileAttachment){return(
FileAttachment("UserData.json").json()
)}

function _12(md){return(
md`## Requirement`
)}

function _tw(d3){return(
d3.json("https://cdn.jsdelivr.net/npm/taiwan-atlas/towns-10t.json")
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _d3(require){return(
require("d3@5")
)}

function _path(d3){return(
d3.geoPath()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["UserData.json", {url: new URL("../json/UserData.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("colorset")).define("colorset", _colorset);
  main.variable(observer("thresholdDomain")).define("thresholdDomain", _thresholdDomain);
  main.variable(observer("coloredRegion")).define("coloredRegion", ["colorset"], _coloredRegion);
  main.variable(observer("thresholdScale")).define("thresholdScale", ["coloredRegion","d3","thresholdDomain","colorset"], _thresholdScale);
  main.variable(observer("viewof bgColor")).define("viewof bgColor", ["Inputs"], _bgColor);
  main.variable(observer("bgColor")).define("bgColor", ["Generators", "viewof bgColor"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeColor")).define("viewof strokeColor", ["Inputs"], _strokeColor);
  main.variable(observer("strokeColor")).define("strokeColor", ["Generators", "viewof strokeColor"], (G, _) => G.input(_));
  main.variable(observer("viewof strokeOpacity")).define("viewof strokeOpacity", ["Inputs"], _strokeOpacity);
  main.variable(observer("strokeOpacity")).define("strokeOpacity", ["Generators", "viewof strokeOpacity"], (G, _) => G.input(_));
  main.variable(observer("taiwan")).define("taiwan", ["taiwanMap"], _taiwan);
  main.variable(observer("taiwanMap")).define("taiwanMap", ["d3","topojson","tw","DOM","bgColor","strokeColor","strokeOpacity","data"], _taiwanMap);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["md"], _12);
  const child1 = runtime.module(define1);
  main.import("select", child1);
  main.variable(observer("tw")).define("tw", ["d3"], _tw);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("path")).define("path", ["d3"], _path);
  return main;
}
