/*
 * @Author: 陈诚
 * @Date: 2021-08-30 14:37:15
 * @LastEditTime: 2021-08-31 17:03:17
 * @LastEditors: 陈诚
 * @Description: 经理室
 */
const bossRoom = [
  {
    uuid: '',
    type: 'group',
    name: 'bossRoom_table',
    x:-710,
    z:950,
    y:0,
    children: [{
      uuid: '',
      name: 'bossRoom_table',
      type: "cube",
      width: 150,
      height: 10,
      depth: 300,
      x:0,
      z:0,
      y:150,
      skin:{
        color:'#fff'
      }
    }
  ]
  },
  {
    uuid:"",
    name: 'bossRoom_table',
    type:"objloader",
    objImg: 'computer/computer.obj',
    mtlImg: 'computer/computer.mtl',
    x:-700,
    z:1000,
    y:155,
    rotate:{
      x: -Math.PI /2,
      z: -Math.PI /2
    },
    scale: {
      x: 0.2,
      y: 0.2,
      z: 0.2
    }
  }
]
for(let i =0;i<2;i++){
  for(let j =0;j<2;j++){
    bossRoom[0].children.push({
      uuid:"",
      type:'cylinder',
      name:'bossRoom_table',
      width:4,
      height:4,
      depth:150,
      x: i ===0 ? -70 : 70,
      y: 75,
      z:  j === 0  ? -95 : 95,
      skin:{
        color:'#fff'
      },
      rotate:{
        z: i=== 0 ? -Math.PI / 6 : Math.PI / 6
      }
    })
  }
}

export default bossRoom