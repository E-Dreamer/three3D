/*
 * @Author: 陈诚
 * @Date: 2021-09-01 11:19:47
 * @LastEditTime: 2021-09-01 11:27:28
 * @LastEditors: 陈诚
 * @Description: 
 */
const financialRoom = [{
    uuid: '',
    type: "group",
    name: 'financialRoom',
    x: -800,
    z: 2850,
    y: 0,
    children: [{
      uuid: "",
      name: "financialRoom",
      type: 'cube',
      width: 150,
      height: 10,
      depth: 300,
      x: 0,
      z: 0,
      y: 150,
      skin: {
        color: '#fff'
      }

    }]
  },
  {
    uuid: "",
    name: 'financialRoom',
    type: "objloader",
    objImg: 'computer/computer.obj',
    mtlImg: 'computer/computer.mtl',
    x: -800,
    z: 2850,
    y: 160,
    rotate: {
      x: -Math.PI / 2,
      z: -Math.PI / 2
    },
    scale: {
      x: 0.2,
      y: 0.2,
      z: 0.2
    }
  },
  {
    uuid:'',
    name: 'financialRoom',
    type: "objloader",
    objImg: 'chair/chair.obj',
    mtlImg: 'chair/chair.mtl',
    x: -920,
    z: 2850,
    y: 0,
    rotate: {
      x: -Math.PI / 2,
      z: Math.PI / 2
    },
    scale: {
      x: 0.8,
      y: 0.8,
      z: 0.8
    }
  }
]

for(let i =0;i<2;i++){
  for(let j =0;j<2;j++){
    financialRoom[0].children.push({
      uuid:"",
      type:'cylinder',
      name:'financialRoom',
      width:4,
      height:4,
      depth:150,
      x: i ===0 ? -70 : 70,
      y: 75,
      z:  j === 0  ? -95 : 95,
      skin:{
        color:'#fff'
      }
    })
  }
}
export default financialRoom;