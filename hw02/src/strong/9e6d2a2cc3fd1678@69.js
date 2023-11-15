function _1(md){return(
md`# HW02 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _3(md){return(
md`- 以 bar chart / histogram 呈現每個星座的人數，用顏色表示性別
- X軸為各個星座的名稱(須為中文)，Y軸為人數
- 必須包含sign，格式如範例圖`
)}

function _4(md){return(
md`### 以 bar chart 呈現每個星座的人數  (1pt)`
)}

function _dCounts(){return(
[]
)}

function _6(dCounts,data)
{
  dCounts.length = 0;
  for (var s=0; s<=11; s++) {
    dCounts.push({constellation:s, gender:"male", count:0});
    dCounts.push({constellation:s, gender:"female", count:0});   
  }
  data.forEach (x=> {
    var i = (x.Constellation)*2 + (x.Gender=="男" ? 0 : 1); 
    dCounts[i].count++;
  })
  return dCounts
}


function _list(){return(
[
  "牡羊座",
  "金牛座",
  "雙子座",
  "巨蟹座",
  "獅子座",
  "處女座",
  "天秤座",
  "天蠍座",
  "射手座",
  "摩羯座",
  "水瓶座",
  "雙魚座 "
]
)}

function _8(Plot,dCounts,list){return(
Plot.plot({
  grid: true,
  y: {grid: true, label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(dCounts, {
      x: "constellation",
      y: "count",
      fill: "gender",
      tip: true,
      title: (d) =>
        `count: ${d.count} \nConstellation: ${list[d.constellation]}\ngender: ${d.gender}`
    }),
    Plot.axisX({
      tickFormat: d => {
        return list[d]; 
      },
    }),
  ]
})
)}

function _9(md){return(
md`### 以 histogram 呈現每個星座的人數  (1pt)`
)}

function _10(Plot,data,list){return(
Plot.plot({
  width: 900,
  grid: true,
  x: { domain: [0, 12]},
	y: { label: "count"},  
	marks: [    
		Plot.rectY(data, Plot.binX(
      {y:"count"}, 
      {x:"Constellation", interval:1, 
       fill:"Gender", 
       tip: true,
       title: (d) =>
        `Constellation: ${list[d.constellation]}
        \ngender: ${d.Gender}
        \n`},)),
		Plot.axisX({
      tickFormat: d => {
        return list[d]; 
      },
    }),
    Plot.ruleY([0]),
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("./files/01d24d9aeda19b7590d996fac1553c965097547ebd857a93a21c0f86efc088993c6168f092b2353e6ec91202e5a6dead5ad66b688c1038a20deb6ec8d35e570d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("dCounts")).define("dCounts", _dCounts);
  main.variable(observer()).define(["dCounts","data"], _6);
  main.variable(observer("list")).define("list", _list);
  main.variable(observer()).define(["Plot","dCounts","list"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Plot","data","list"], _10);
  return main;
}
