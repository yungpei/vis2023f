import define1 from "./a0ddc2902ee948e3@7.js";

function _1(md){return(
md`# HW02 Simple baseline (4pt)`
)}

function _2(md){return(
md`### 以 histogram 呈現每個年份出生的人數 (2pt)`
)}

function _4(data){return(
data
)}

function _5(Plot,data){return(
Plot.plot({
  y: {grid: true, label: "count"},
  marks: [
    Plot.rectY(data, Plot.binX({y:"count"}, { x:"Year", interval: 1 })), 
		Plot.gridY({ interval: 1, stroke:  "white", strokeOpacity: 0.5 })
  ]
})
)}

function _6(md){return(
md`### 可調整 margin, fill color,  tip (2pt)`
)}

function _Plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _8(Plot,Plot1,data){return(
Plot.plot({  
	marginTop: Plot1.mt, 
	marginRight: Plot1.mr, 
	marginBottom: Plot1.mb, 
	marginLeft: Plot1.ml,   
	y: {grid: true, label: "count"},  
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Year", interval:1, fill:"Gender", tip: true })),    
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 })
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
  main.variable(observer()).define(["Plot","data"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("viewof Plot1")).define("viewof Plot1", ["Inputs"], _Plot1);
  main.variable(observer("Plot1")).define("Plot1", ["Generators", "viewof Plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","Plot1","data"], _8);
  return main;
}
