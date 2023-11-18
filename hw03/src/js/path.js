/*const icon = document.getElementById('icon');
const jsonUrl = '../json/userLocationData.json'; 

function calculatePosition(x, y) {
  const minX = 10.45;
  const maxX = 60.47;
  const minY = -11.64;
  const maxY = 15.91;

  const iconX = ((x - minX) / (maxX - minX)) * 100;
  const iconY = ((y - minY) / (maxY - minY)) * 100;

  return { x: iconX, y: iconY };
}

function updateIconPosition(x, y) {
  const { x: iconX, y: iconY } = calculatePosition(x, y);
  icon.style.left = `${iconX}%`;
  icon.style.top = `${iconY}%`;
}

function loadjson() {
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      // Assuming the data is an array of objects
      const lastDataPoint = data[data.length - 1];
      updateIconPosition(lastDataPoint.X, lastDataPoint.Y);
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

// 初始加載icon位置
loadjson();

// 每秒更新一次位置
setInterval(loadjson, 1000);
*/
const icon = document.getElementById('icon');
const jsonUrl = '../json/userLocationData.json'; 

function calculatePosition(x, y) {
  const minX = 10.45;
  const maxX = 60.47;
  const minY = -11.64;
  const maxY = 15.91;

  const iconX = ((x - minX) / (maxX - minX)) * 100;
  const iconY = ((y - minY) / (maxY - minY)) * 100;

  return { x: iconX, y: iconY };
}

function updateIconPosition(x, y) {
  console.log(x,y);
  const { x: iconX, y: iconY } = calculatePosition(x, y);
  icon.style.left = `${iconX}%`;
  icon.style.top = `${iconY}%`;
}
let currentIndex = 0;
let jsonData = null;
function loadjson() {
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      jsonData = data;
      if (currentIndex < jsonData.length) {
        const point = jsonData[currentIndex];
        updateIconPosition(point.X, point.Y);
        currentIndex++; 
      } else {
        currentIndex = 0;
      }
    })
    .catch(error => console.error('Error fetching JSON:', error));
}

// 初始加載icon位置
loadjson();

// 每秒更新一次位置
setInterval(loadjson, 1000);