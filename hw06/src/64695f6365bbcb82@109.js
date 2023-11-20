import define1 from "./3b039b075022c35e@208.js";

function _1(md){return(
md`# HW06 堆疊柱狀圖`
)}

function _2(md){return(
md`## Simple baseline (3pt)
- 利用Plot完成堆疊柱狀圖(2pt)
- 加入Checkbox input使其可選擇呈現的資料集(1pt)`
)}

function _selectedSeries(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _4(Plot,artist_columnKey,data,selectedSeries){return(
Plot.plot({
  height: 600,
  title: artist_columnKey,
  x: {
    label: 'Value',
    domain: data.map(d => d.value),
    padding: 0.1
  },
  y: {
    label: 'Count',
    grid: true
  },
  color: {
    domain: ['artist', 'artistpublic'],
    range: ['#84C1FF', '#FF95CA'],  // 你可以根據需要更改顏色
    legend: true
  },
  marks: [
    Plot.barY(data.filter(d => selectedSeries.includes(d.series)), Plot.stackY({ 
      x: "value",
      y: "count",
      fill: "series",
      title: d => `${d.series}\nvalue: ${d.value}\ncount: ${d.count}`
    }))
  ]
})
)}

function _5(md){return(
md`## Medium baseline (4pt)
- 利用SVG完成堆疊柱狀圖 (含Checkbox )(3pt)
- 加入D3的過渡效果(1pt)`
)}

function _selectedSeries1(Inputs){return(
Inputs.checkbox(["artist", "artistpublic"], {label: "Choose datasets", value: ["artist", "artistpublic"]})
)}

function _chart1(data,selectedSeries1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇的系列過濾數據
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#84C1FF', '#FF95CA']);

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
        //新增以下兩行可新增出過渡效果
          .transition() 
          .duration(1000) //改為0可以呈現無過度效果
        //新增到這兩行可新增出過渡效果
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]));
  });

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  return svg.node();
}


function _8(md){return(
md`## Strong baseline (3pt)
- 利用SVG製成的堆疊柱狀圖添加陰影效果(2pt)
- 添加滑鼠游標偵測效果(1pt)`
)}

function _chart2(data,selectedSeries1,d3)
{
  // 定義邊界大小，以及圖形的寬度和高度
  const margin = {top: 20, right: 30, bottom: 30, left: 40};
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // 取得所有的系列名稱（無重複）
  const keys = Array.from(new Set(data.map(d => d.series)));
  
  // 根據選擇的系列過濾數據
  const filteredData = data.filter(d => selectedSeries1.includes(d.series));

  // 對過濾後的數據進行分組處理
  let grouped = Array.from(d3.group(filteredData, d => d.value), ([key, value]) => {
    return {value: key, ...Object.fromEntries(value.map(obj => [obj.series, obj.count]))};
  });

  // 定義堆疊方式並計算
  const stack = d3.stack().keys(keys);
  const series = stack(grouped);
  
  // 定義x軸的比例尺
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.value))
    .range([0, width])
    .padding(0.1);

  // 定義y軸的比例尺
  const yMax = d3.max(series, serie => d3.max(serie, d => d[1]));
  const yScale = d3.scaleLinear()
      .domain([0, yMax]).nice()
      .range([height, 0]);

  // 定義顏色的比例尺
  const colorScale = d3.scaleOrdinal()
    .domain(keys)
    .range(['#84C1FF', '#FF95CA']);
   // .range(['lightblue', 'lightblue']);
     //d3.scaleLinear().domain([舊的範圍]).range([新的範圍]) 
    //就是把舊範圍縮放到新的範圍內 

  // 創建SVG元素
  const svg = d3.create("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
  
  // 添加陰影濾鏡效果
  const defs = svg.append("defs");
  const filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
  
  filter.append("feGaussianBlur") //SVG濾鏡效果(高斯模糊) 用於模糊影像
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 4) //模糊的程度
      .attr("result", "blur"); //濾鏡的輸出

  filter.append("feOffset") //濾鏡的輸出(位移)
      .attr("in", "blur") //濾鏡的輸出(為前面定義的blur)
      .attr("dx", 4) //水平位移量
      .attr("dy", 4) //垂直位移量
      .attr("result", "offsetBlur"); //濾鏡的輸出名稱

  const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
               .attr("in", "offsetBlur");
        feMerge.append("feMergeNode")
               .attr("in", "SourceGraphic"); //


  // 在SVG中添加一個包含所有內容的g元素(對它進行一個平移變換，以便為接下來的元素提供一個留白的區域)
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // 繪製每一個系列的柱子
  series.forEach((serie) => {
      let bars = g.append("g")
          .attr("fill", colorScale(serie.key))
          .selectAll("rect")
          .data(serie);
  
      bars.enter().append("rect")
          .attr("x", d => xScale(d.data.value))
          .attr("y", height)
          .attr("width", xScale.bandwidth())
          .attr("height", 0)
          .attr("y", d => yScale(d[1]))
          .attr("height", d => yScale(d[0]) - yScale(d[1]))
          .attr("filter", "url(#drop-shadow)") // 添加陰影濾鏡效果
          .on("mouseover", function(d) {
              d3.select(this).attr("fill", "#8E8E8E");
            })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", colorScale(serie.key)); // 恢復原來的顏色
        d3.select(".tooltip").remove();

        });
});

  // 繪製x軸
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // 繪製y軸
  g.append("g")
    .call(d3.axisLeft(yScale));

  

  return svg.node();
}


function _10(md){return(
md`### Requirements`
)}

function _artistVer(FileAttachment){return(
FileAttachment("artistVer.csv").csv()
)}

function _artistPublic(FileAttachment){return(
FileAttachment("artistPublic.csv").csv()
)}

function _artist_columnKey(artistVer){return(
Object.keys(artistVer[0])[6]
)}

function _artist_column(artistVer,artist_columnKey){return(
artistVer.map(row => row[artist_columnKey])
)}

function _artistver_uniqueValues(artist_column){return(
[...new Set(artist_column)].sort()
)}

function _artist_counts(artistver_uniqueValues,artist_column){return(
artistver_uniqueValues.map(val => ({
  value: val,
  count: artist_column.filter(v => v === val).length
}))
)}

function _artistpublic_columnKey(artistPublic){return(
Object.keys(artistPublic[0])[10]
)}

function _artistpublic_column(artistPublic,artistpublic_columnKey){return(
artistPublic.map(row => String(row[artistpublic_columnKey]))
)}

function _artistpublic_uniqueValues(artistpublic_column){return(
[...new Set(artistpublic_column)].sort()
)}

function _artistpublic_counts(artistpublic_uniqueValues,artistpublic_column){return(
artistpublic_uniqueValues.map(val => ({
  value: val,
  count: artistpublic_column.filter(v => v === String(val)).length
}))
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artistPublic.csv", {url: new URL("../artistPublic.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["artistVer.csv", {url: new URL("../artistVer.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof selectedSeries")).define("viewof selectedSeries", ["Inputs"], _selectedSeries);
  main.variable(observer("selectedSeries")).define("selectedSeries", ["Generators", "viewof selectedSeries"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","artist_columnKey","data","selectedSeries"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof selectedSeries1")).define("viewof selectedSeries1", ["Inputs"], _selectedSeries1);
  main.variable(observer("selectedSeries1")).define("selectedSeries1", ["Generators", "viewof selectedSeries1"], (G, _) => G.input(_));
  main.variable(observer("chart1")).define("chart1", ["data","selectedSeries1","d3"], _chart1);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("chart2")).define("chart2", ["data","selectedSeries1","d3"], _chart2);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("artistVer")).define("artistVer", ["FileAttachment"], _artistVer);
  main.variable(observer("artistPublic")).define("artistPublic", ["FileAttachment"], _artistPublic);
  main.variable(observer("artist_columnKey")).define("artist_columnKey", ["artistVer"], _artist_columnKey);
  main.variable(observer("artist_column")).define("artist_column", ["artistVer","artist_columnKey"], _artist_column);
  main.variable(observer("artistver_uniqueValues")).define("artistver_uniqueValues", ["artist_column"], _artistver_uniqueValues);
  main.variable(observer("artist_counts")).define("artist_counts", ["artistver_uniqueValues","artist_column"], _artist_counts);
  main.variable(observer("artistpublic_columnKey")).define("artistpublic_columnKey", ["artistPublic"], _artistpublic_columnKey);
  main.variable(observer("artistpublic_column")).define("artistpublic_column", ["artistPublic","artistpublic_columnKey"], _artistpublic_column);
  main.variable(observer("artistpublic_uniqueValues")).define("artistpublic_uniqueValues", ["artistpublic_column"], _artistpublic_uniqueValues);
  main.variable(observer("artistpublic_counts")).define("artistpublic_counts", ["artistpublic_uniqueValues","artistpublic_column"], _artistpublic_counts);
  const child1 = runtime.module(define1);
  main.import("data", child1);
  return main;
}
