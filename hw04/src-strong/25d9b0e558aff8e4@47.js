function _1(md){return(
md`# HW04 Strong baseline
- 將兩個問題之間的意義以圖表呈現(可互動) (3pt)`
)}

function _chart(d3,data)
{
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 2400;
  const format = d3.format(",d");

  // Create a color scale (a color for each child of the root node and their descendants).
  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))

  // Create a partition layout.
  const partition = d3.partition()
      .size([height, width])
      .padding(1);

  // Apply the partition layout.
  const root = partition(d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif");

  // Add a cell for each node of the hierarchy.
  const cell = svg
    .selectAll()
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y0},${d.x0})`);

  cell.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  // Color the cell with respect to which child of root it belongs to. 
  cell.append("rect")
      .attr("width", d => d.y1 - d.y0)
      .attr("height", d => d.x1 - d.x0)
      .attr("fill-opacity", 0.6)
      .attr("fill", d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      });

  // Add labels and a title.
  const text = cell.filter(d => (d.x1 - d.x0) > 16).append("text")
      .attr("x", 4)
      .attr("y", 13);

  text.append("tspan")
      .text(d => d.data.name);

  text.append("tspan")
      .attr("fill-opacity", 0.7)
      .text(d => ` ${format(d.value)}`);

  return svg.node();
}


function _3(md){return(
md`## 結論`
)}

function _4(md){return(
md`1. 從圖表可以看出有96位任職於工作室，其中有42位有在推動永續事務。
2. 其中令我滿驚訝的是，畫廊在推動永續事務竟然比校院還低，但也有可能是因為填寫表單的比例相對較低。`
)}

function _5(md){return(
md`## 資料、參數`
)}

function _artist(FileAttachment){return(
FileAttachment("artist.csv").csv()
)}

function _questionOne(artist){return(
Object.keys(artist[0])[1]
)}

function _questionTwo(artist){return(
Object.keys(artist[0])[15]
)}

function _data(artist,questionOne,questionTwo,buildHierarchy)
{
  let firstAnswer = artist.map(row => row[questionOne]);
  let secondAnswer = artist.map(row => row[questionTwo]);

  let combinedAnswers = firstAnswer.map((innAns, index) => innAns + '-' + secondAnswer[index])

  let reformatAnswers = combinedAnswers.map(item => {
    const [prefix, values] = item.split('-');
    const splitValues = values.split(';').map(value => value.trim());
    return splitValues.map(value => `${prefix}-${value}`);
  }).reduce((acc, curr) => acc.concat(curr), []);

  let answerCounts = {};
  reformatAnswers.forEach(reformatAns => {
    answerCounts[reformatAns] = (answerCounts[reformatAns] || 0) + 1;
  })

  let csvData = Object.entries(answerCounts).map(([answer, count]) => [answer, String(count)]);

  return buildHierarchy(csvData);
}


function _buildHierarchy(){return(
function buildHierarchy(csv) {
  // Helper function that transforms the given CSV into a hierarchical format.
  const root = { name: "root", children: [] };
  for (let i = 0; i < csv.length; i++) {
    const sequence = csv[i][0];
    const size = +csv[i][1];
    if (isNaN(size)) {
      // e.g. if this is a header row
      continue;
    }
    const parts = sequence.split("-");
    let currentNode = root;
    for (let j = 0; j < parts.length; j++) {
      const children = currentNode["children"];
      const nodeName = parts[j];
      let childNode = null;
      if (j + 1 < parts.length) {
        // Not yet at the end of the sequence; move down the tree.
        let foundChild = false;
        for (let k = 0; k < children.length; k++) {
          if (children[k]["name"] == nodeName) {
            childNode = children[k];
            foundChild = true;
            break;
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = { name: nodeName, children: [] };
          children.push(childNode);
        }
        currentNode = childNode;
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = { name: nodeName, value: size };
        children.push(childNode);
      }
    }
  }
  return root;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artist.csv", {url: new URL("./files/2dd4c491cf7e957248d1caf65a08e2bc0868d56f3569b8b379a7b67489d9faff9a54a4d2a5c4ab4642b340abb13e9abb5ca6d35acbdfcfedf3055009fdd893fc.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","data"], _chart);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("artist")).define("artist", ["FileAttachment"], _artist);
  main.variable(observer("questionOne")).define("questionOne", ["artist"], _questionOne);
  main.variable(observer("questionTwo")).define("questionTwo", ["artist"], _questionTwo);
  main.variable(observer("data")).define("data", ["artist","questionOne","questionTwo","buildHierarchy"], _data);
  main.variable(observer("buildHierarchy")).define("buildHierarchy", _buildHierarchy);
  return main;
}
