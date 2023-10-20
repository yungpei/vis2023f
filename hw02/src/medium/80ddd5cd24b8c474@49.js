import define1 from "./a0ddc2902ee948e3@7.js";

function _1(md){return(
md`# HW02 Medium baseline (4pt)`
)}

function _2(md){return(
md`### 以 bar chart 呈現每個年份出生的人數 (2pt)	`
)}

function _4(data){return(
data
)}

function _5(md){return(
md`#### 資料處理`
)}

function _yCounts(){return(
[]
)}

function _years(data){return(
data.map(item => item.Year)
)}

function _8(yCounts,years,data)
{
  yCounts.length = 0; //將yCounts清空
  var minYear = Math.min(...years); //最早出生年
  var maxYear = Math.max(...years); //最晚出生年
  for (var y=minYear; y<=maxYear; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({year:y, gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    yCounts.push({year:y, gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Year-minYear)*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return yCounts
}


function _9(Plot,yCounts){return(
Plot.plot({
  width: 900,
  y: {grid: true, label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "year", y: "count"}), 
  ]
})
)}

function _10(md){return(
md`### 可調整 margin, fill color,  tip (2pt)`
)}

function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _12(Plot,plot2,yCounts){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
  grid: true,
  width: 900,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "year", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  const child1 = runtime.module(define1);
  main.import("data", child1);
  main.variable(observer()).define(["data"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("years")).define("years", ["data"], _years);
  main.variable(observer()).define(["yCounts","years","data"], _8);
  main.variable(observer()).define(["Plot","yCounts"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","yCounts"], _12);
  return main;
}
