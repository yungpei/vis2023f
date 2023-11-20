/*const jsonUrl02 = '../json/userLocationData.json';

// Step 1: Fetch JSON data
fetch(jsonUrl02)
  .then(response => response.json())
  .then(jsonData => {
    // Step 2: Group data by floor
    const dataByFloor = jsonData.reduce((acc, point) => {
      const floor = point.Floor;
      if (!acc[floor]) {
        acc[floor] = [];
      }
      acc[floor].push(point);
      return acc;
    }, {});

    // Step 3: Calculate stay times
    function calculateStayTime(points) {
      let stayTimes = [];
      for (let i = 1; i < points.length; i++) {
        const currentTime = new Date(points[i].Timestamp);
        const prevTime = new Date(points[i - 1].Timestamp);
        const stayTime = (currentTime - prevTime) / 1000; // Convert to seconds
        stayTimes.push(stayTime);
      }
      return stayTimes;
    }

    // Step 4: Add data to heatmap for each floor
    for (const floor in dataByFloor) {
      const stayTimes = calculateStayTime(dataByFloor[floor]);

      // Create a canvas for each floor
      const canvas = document.createElement('canvas');
      canvas.width = 100; // Set width as needed
      canvas.height = 100; // Set height as needed
      canvas.classList.add('heatmap-canvas'); // Add a class for styling
      document.getElementById(`floor${floor}`).appendChild(canvas);

      // Create heatmap instance for each floor
      const heatmapInstance = h337.create({
        container: canvas,
        maxOpacity: 0.8,
        radius: 10,
        blur: 0.9,
      });

      // Add data to heatmap
      const floorData = dataByFloor[floor].map((point, index) => ({
        x: point.X,
        y: point.Y,
        value: stayTimes[index],
      }));

      heatmapInstance.addData({
        max: Math.max(...stayTimes),
        data: floorData,
      });
    }
  })
  .catch(error => console.error('Error fetching JSON:', error));*/

const jsonDataPath = '../json/userLocationData.json';

// 獲取所有展廳的元素
const floors = document.querySelectorAll('.grid-item');

// 使用fetch API獲取JSON數據
fetch(jsonDataPath)
  .then(response => response.json())
  .then(data => {
    // 對每個展廳生成熱力圖
    floors.forEach((floor, index) => {
      const svgContainer = floor.querySelector('.heatmap-canvas');

      // 生成熱力圖
      generateHeatmap(data, svgContainer, index + 1);
    });
  })
  .catch(error => console.error('Error fetching JSON data:', error));

// 這個函數用來生成熱力圖
function generateHeatmap(data, container, floorNumber) {
  // 篩選與特定樓層相關的數據
  const floorData = data.filter(item => item.Floor === `${floorNumber}F`);

  // 在這裡設定SVG寬高和margin
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const width = 400 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // 創建SVG元素
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // 在這裡，你可以使用D3.js提供的方法，根據floorData數據繪製熱力圖
  // 以下僅為一個簡單的例子
  // 注意：這個示例僅為演示用途，實際情況下，你可能需要使用合適的熱力圖庫或自行繪製

  // 1. 創建一個顏色比例尺（可以根據需要更改顏色）
  const colorScale = d3.scaleSequential(d3.interpolateViridis)
    .domain([0, d3.max(floorData, d => d.Calorie)]);

  const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([0, height]);
  const radiusScale = d3.scaleLinear().domain([0, 500]).range([2, 10]);
  // 2. 創建一個數據點圓點（可以根據需要更改形狀和大小）
  svg.selectAll("circle")
    .data(floorData)
    .enter().append("circle")
    .attr("cx", d => xScale(d.X))
    .attr("cy", d => yScale(d.Y))
    .attr("r", d => radiusScale(d.Calorie))
    .attr("fill", d => colorScale(d.Calorie));

  // 3. 可以添加其他元素和標籤，以使熱力圖更具信息性

  // 注意：上述代碼僅為演示，實際情況下，你可能需要更複雜的繪製邏輯或使用專門的熱力圖庫。
}
