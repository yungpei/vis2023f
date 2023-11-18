let totalDistance = 0;
let totalTime = 0;

function calculateDistance(x1, y1, x2, y2) {
  // 這裡可以使用適當的算法計算兩點之間的距離，例如歐幾里得距離公式
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  return distance;
}

function updateCaloriesAndTime(x, y) {
  if (currentIndex > 0) {
    const prevPoint = jsonData[currentIndex - 1];
    const distance = calculateDistance(prevPoint.X, prevPoint.Y, x, y);
    const speed = 2; // 假設平均步行速度為每秒1公尺
    const time = distance / speed;
    
    totalDistance += distance;
    totalTime += time;

    console.log("Total Distance:", totalDistance, "meters");
    console.log("Total Time:", totalTime, "seconds");
    console.log("Total Calories:", calculateCalories(totalDistance), "calories");
  }
}

function calculateCalories(distance) {
  // 這裡可以使用適當的算法計算卡路里，例如基於距離和體重的公式
  const weight = 55; // 假設體重為55公斤
  const calories = distance * 0.0005 * weight; // 假設每公尺消耗0.0005卡路里
  return calories;
}
function updateInfo() {
    document.getElementById('distance-info').innerText = `Total Distance: ${totalDistance.toFixed(2)} meters`;
    document.getElementById('time-info').innerText = `Total Time: ${totalTime.toFixed(2)} seconds`;
    document.getElementById('calories-info').innerText = `Total Calories: ${calculateCalories(totalDistance).toFixed(2)} calories`;
  }
  
  // 在 loadjson 函式中的位置更新後呼叫
  function loadjson() {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        jsonData = data;
        if (currentIndex < jsonData.length) {
          const point = jsonData[currentIndex];
          updateIconPosition(point.X, point.Y);
          updateCaloriesAndTime(point.X, point.Y);
          updateInfo(); // 更新資訊
          currentIndex++; 
        } else {
          currentIndex = 0;
        }
      })
      .catch(error => console.error('Error fetching JSON:', error));
  }
  
  // 初始加載icon位置
  loadjson();
  
  // 每秒更新一次位置和相關資訊
  setInterval(loadjson, 1000);
  
  