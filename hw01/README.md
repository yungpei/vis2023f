# Math.random()


> 函數 `Math.random()` 會回傳一個偽隨機小數 (pseudo-random) 介於 0 到 1 之間( 0 <= x < 1) 

1. Getting a random number between 0 (inclusive) and 1 (exclusive)
~~~js
function getRandom() {
  return Math.random();
}
~~~

2. Getting a random number between two values
~~~js
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
~~~

3. Getting a random integer between two values
~~~js
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
~~~

4. Getting a random integer between two values, inclusive
~~~js
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
~~~


### 參考資料
* [Math.random()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%E5%98%97%E8%A9%A6%E4%B8%80%E4%B8%8B) 
* [Javascript 初學](https://hackmd.io/_6ue_XDBSBmwouAF5iAEJw?view) 