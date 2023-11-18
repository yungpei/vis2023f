const jsonUrl = '../json/userLocationData.json';

// Step 1: Fetch JSON data
fetch(jsonUrl)
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
  .catch(error => console.error('Error fetching or parsing JSON:', error));
