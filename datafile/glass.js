/*
 * @Author: 陈诚
 * @Date: 2021-08-30 09:49:16
 * @LastEditTime: 2021-08-31 13:50:02
 * @LastEditors: 陈诚
 * @Description: 玻璃
 */
// 玻璃
const glass = [];
const glassArr = [{
    width: 2000,
    height: 400,
    x: 0,
    y: 200,
    z: 0,
    rotate: {
      x: 0,
      y: Math.PI,
      z: 0
    }
  },
  {
    width: 3000,
    height: 400,
    x: -1000,
    y: 200,
    z: 1500,
    rotate: {
      x: 0,
      y: Math.PI + Math.PI / 2,
      z: 0
    }
  }
]
glassArr.forEach(item => {
  glass.push({
    uuid: '',
    name: 'glass',
    type: "plane",
    width: item.width,
    height: item.height,
    depth: 10,
    x: item.x,
    y: item.y,
    z: item.z,
    pic: 'glass.png',
    transparent: true,
    opacity: 0.1,
    rotate: item.rotate
  })
})
export default glass