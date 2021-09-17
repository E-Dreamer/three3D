/*
 * @Author: 陈诚
 * @Date: 2021-08-30 09:47:28
 * @LastEditTime: 2021-09-01 14:25:24
 * @LastEditors: 陈诚
 * @Description: 地板数据
 */
// 地板
const floor = [
]
const floorArr = [{
    width: 1000,
    height: 2000,
    x: -500,
    y: -5,
    z: 2000,
    rotate: {
      y: 0,
      x: Math.PI / 2,
      z: 0
    },
  },
  {
    x: -500,
    y: -5,
    z: 500,
    width: 1000,
    height: 1000,
    rotate: {
      y: 0,
      x: Math.PI / 2,
      z: Math.PI / 2
    }
  },
  {
    width: 1000,
    height: 2000,
    x: 1000,
    y: -5,
    z: 500,
    rotate: {
      y: 0,
      x: Math.PI / 2,
      z: Math.PI / 2
    }
  }
]
floorArr.map(item => {
  floor.push({
    uuid: "",
    name: 'floor',
    type: 'cube',
    width: item.width,
    height: item.height,
    depth: 10,
    x: item.x,
    y: item.y,
    z: item.z,
    skin: {
      color: '#6ea1b5',
      skinLeft: {
        img: 'floor.jpg',
        repeatx: true,
        repeaty: true,
        RX: 128,
        RY: 128
      }
    },
    rotate: item.rotate,
  }, )
})
export default floor