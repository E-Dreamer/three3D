/*
 * @Author: 陈诚
 * @Date: 2021-08-30 09:46:31
 * @LastEditTime: 2021-08-31 17:04:12
 * @LastEditors: 陈诚
 * @Description: 办公室
 */
// 办公室桌子
const officeArea_tables = {
  uuid: '',
  name: 'office_tables',
  type: 'group',
  x: 100,
  y: 250,
  z: 400,
  children: [{
    uuid: '',
    name: 'office_tables',
    type: 'cube',
    width: 1000,
    height: 10,
    depth: 400,
    x: 0,
    y: 0,
    z: 0,
    skin: {
      color: "#fff"
    }
  }, ]
}
// 生成六条腿
let xarr = [-495, 0, 495]
let zarr = [-195, 195]
for (let i = 0; i < xarr.length; i++) {
  for (let j = 0; j < zarr.length; j++) {
    officeArea_tables.children.push({
      uuid: '',
      type: "cylinder",
      width: 5,
      height: 5,
      depth: 250,
      x: xarr[i],
      y: -125,
      z: zarr[j],
      skin: {
        color: '#fff'
      }
    })
  }
}
// 办公室椅子
const officeArea_chair = [];
//办公室电脑
const officeArea_computer = [];
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 2; j++) {
    officeArea_chair.push({
      uuid: "",
      name: 'chair',
      type: 'objloader',
      objImg: 'chair/chair.obj',
      mtlImg: 'chair/chair.mtl',
      x: i == 0 ? 300 : -200,
      y: 0,
      z: j == 1 ? 150 : 600,
      rotate: {
        z: j === 0 ? Math.PI : 0,
        x: -Math.PI / 2,
      },
      scale: {
        x: 1,
        y: 1,
        z: 1
      }
    })
    officeArea_computer.push({
      uuid: "",
      name: 'computer',
      type: 'objloader',
      objImg: 'computer/computer.obj',
      mtlImg: 'computer/computer.mtl',
      x: i == 0 ? 300 : -200,
      y: 255,
      z: j == 0 ? 280 : 520,
      rotate: {
        z: j === 0 ? Math.PI : 0,
        x: -Math.PI / 2,
      },
      scale: {
        x: 0.2,
        y: 0.2,
        z: 0.2
      }
    })
  }
}

// 桌子之间的玻璃
const officeArea_glass = [];
for (let i = 0; i < 2; i++) {
  officeArea_glass.push({
    uuid: "",
    name: "office_glass",
    type: 'group',
    x: i === 0 ? -150 : 350,
    y: 300,
    z: 400,
    children: [{
        uuid: '',
        type: 'merge',
        parent: {
          uuid: '',
          name: 'office_glass',
          type: 'cube',
          width: 30,
          height: 30,
          depth: 5,
          x: -200,
          y: -30,
          z: 0,
          skin: {
            color: 'black'
          }
        },
        mergeChild: [{
          uuid: '',
          type: 'cube',
          op: '-',
          width: 30,
          height: 20,
          depth: 4,
          x: -200,
          y: -20,
          z: 0,
          skin: {
            color: 'black'
          }
        }]
      },
      {
        uuid: '',
        type: 'merge',
        parent: {
          uuid: '',
          name: 'office_glass',
          type: 'cube',
          width: 30,
          height: 30,
          depth: 5,
          x: 200,
          y: -30,
          z: 0,
          skin: {
            color: 'black'
          }
        },
        mergeChild: [{
          uuid: '',
          type: 'cube',
          op: '-',
          width: 30,
          height: 20,
          depth: 4,
          x: 200,
          y: -20,
          z: 0,
          skin: {
            color: 'black'
          }
        }]
      },
      {
        uuid: '',
        name: 'office_glass',
        type: 'plane',
        width: 450,
        height: 100,
        depth: 10,
        x: 0,
        y: 20,
        z: 0,
        pic: 'glass.png',
        transparent: true,
        opacity: 0.1,
        double: true, //两面都能看到
      }
    ]
  })
}
// 办公区
const officeArea = [
  officeArea_tables,
  ...officeArea_chair,
  ...officeArea_computer,
  ...officeArea_glass
];
export default officeArea