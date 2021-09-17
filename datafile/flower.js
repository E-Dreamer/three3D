/*
 * @Author: 陈诚
 * @Date: 2021-08-30 11:29:18
 * @LastEditTime: 2021-08-31 17:03:34
 * @LastEditors: 陈诚
 * @Description: 
 */
const flower = [{
  uuid: "",
  name: 'bossRoom_flower',
  type: 'objloader',
  objImg: 'floorPlant/floorPlant.obj',
  mtlImg: "floorPlant/floorPlant.mtl",
  x: -900,
  y: 0,
  z: 1250,
  rotate: {
    x: -Math.PI / 2
  },
  scale: {
    x: 1,
    y: 1,
    z: 1
  }
}]
for (let j = 0; j < 2; j++) {
  for (let i = 0; i < 2; i++) {
    flower.push({
      uuid: '',
      name: 'office_flower',
      type: 'objloader',
      objImg: 'potPlant/potPlant.obj',
      mtlImg: 'potPlant/potPlant.mtl',
      x: j === 0 ? 100 : 1500,
      y: 250,
      z: j === 0 ? (i === 0 ? 350 : 450) : (i === 0 ? 200 : 800),
      rotate: {
        x: -Math.PI / 2
      },
      scale: {
        x: 0.2,
        y: 0.2,
        z: 0.2
      }
    })
  }
}

for (let index = 0; index < 2; index++) {
  flower.push({
    uuid: "",
    name: 'bossRoom_flower',
    type: 'objloader',
    objImg: 'floorPlant/floorPlant.obj',
    mtlImg: "floorPlant/floorPlant.mtl",
    x: -100,
    y: 0,
    z: index === 0 ? 1550 : 2400,
    rotate: {
      x: -Math.PI / 2
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    }
  })

}
export default flower;