/*
 * @Author: 陈诚
 * @Date: 2021-08-30 09:50:28
 * @LastEditTime: 2021-08-31 17:20:41
 * @LastEditors: 陈诚
 * @Description: 墙体
 */
// 墙体
const wall = [];
const wallArr = [{
    width: 1000,
    height: 500,
    x: -500,
    y: 250,
    z: 3000,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  {
    width: 1000,
    height: 500,
    x: 500,
    y: 250,
    z: 1000,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  {
    width: 2000,
    height: 100,
    x: 0,
    y: 50,
    z: 0,
  },
  {
    width: 2000,
    height: 100,
    depth: 10,
    x: 0,
    y: 450,
    z: 0,
  },
  {
    width: 2000,
    height: 100,
    x: 0,
    y: 450,
    z: 0,
  },
  {
    width: 3000,
    height: 100,
    x: -1000,
    y: 450,
    z: 1500,
    rotateY: Math.PI / 2,
  },
  {
    width: 3000,
    height: 100,
    x: -1000,
    y: 50,
    z: 1500,
    rotateY: Math.PI / 2,
  }
]
wallArr.forEach(item => {
  wall.push({
    uuid: "",
    name: 'wall',
    type: 'cube',
    width: item.width,
    height: item.height,
    depth: 10,
    x: item.x,
    y: item.y,
    z: item.z,
    skin: {
      color: '#8da5b3',
    },
    rotate: {
      x: item.rotateX || 0,
      y: item.rotateY || 0,
      z: item.rotateZ || 0
    }
  }, )
})


//其他墙面
const otherWall = [
  {
    uuid: '',
    type: 'merge',
    parent: {
      uuid: '',
      name: 'wall',
      type: 'cube',
      width: 10,
      height: 500,
      depth: 700,
      x: -600,
      y: 250,
      z: 350,
      skin: {
        color: '#8da5b3'
      }
    },
    mergeChild: [{
      uuid: '',
      op: '-',
      name: 'wall',
      type: 'cube',
      width: 10,
      height: 400,
      depth: 200,
      x: -600,
      y: 200,
      z: 450,
      skin: {
        color: '#fff'
      }
    }]
  },
  {
    uuid: '',
    type: 'merge',
    parent: {
      uuid: '',
      name: 'wall',
      type: 'cube',
      width: 500,
      height: 500,
      depth: 10,
      x: -250,
      y: 250,
      z: 2500,
      skin: {
        color: '#8da5b3'
      }
    },
    mergeChild: [{
      uuid: '',
      op: '-',
      name: 'wall',
      type: 'cube',
      width: 200,
      height: 400,
      depth: 10,
      x: -300,
      y: 200,
      z: 2500,
      skin: {
        color: '#fff'
      }
    }]
  },
  {
    uuid: "",
    type: 'merge',
    parent: {
      uuid: '',
      name: 'wall',
      type: 'cube',
      width: 10,
      height: 500,
      depth: 500,
      x: -360,
      y: 250,
      z: 1250,
      skin: {
        color: '#8da5b3'
      }
    },
    mergeChild: [{
      uuid: "",
      name: 'wall',
      type: 'cube',
      op: '-',
      width: 10,
      height: 400,
      depth: 200,
      x: -360,
      y: 200,
      z: 1250,
      skin: {
        color: '#fff'
      }
    }]
  },
  {
    uuid:'',
    type:"merge",
    parent:{
      uuid:"",
      name:'wall',
      type:'cube',
      width:10,
      depth:650,
      height:500,
      x:-600,
      y:250,
      z:1025,
      skin:{
        color:'#8da5b3'
      }
    },
    mergeChild:[
      {
      uuid: "",
      name: 'wall',
      type: 'cube',
      op: '-',
      width: 10,
      height: 400,
      depth: 500,
      x: -600,
      y: 200,
      z: 1050,
      skin: {
        color: '#fff'
      }
    }]
  },
  {
    uuid:"",
    type:'merge',
    parent:{
      uuid:'',
      type:'cube',
      name:'glass',
      width:10,
      depth:500,
      height:400,
      x:-600,
      y:200,
      z:1050,
      skin:{
        color:'#fff',
        img:'glass.png',
        transparent:true,
        opacity:0.1
      }
    },
    mergeChild:[
      {
        uuid:'',
        op: '-',
        name:'glass',
        type:"cube",
        width:10,
        depth:150,
        height:300,
        x:-600,
        y:150,
        z:1200,
        skin:{
          color:'#fff'
        }
      }
    ]
  },
  {
    uuid:'',
    type:"cube",
    name:'bossRoomDoor',
    width:150,
    depth:10,
    height:300,
    x:-600,
    y:150,
    z:1200,
    rotate:{
      y:Math.PI/2
    },
    skin:{
      transparent:true,
      opacity:0.1,
      skinRight:{
        img:'door_left.png',
        transparent:true,
      },
      skinLeft:{
        img:'door_right.png',
        transparent:true,
      }
    }
  },
  {
    uuid: '',
    name: 'receptionRoomDoor',
    type: 'cube',
    width: 200,
    height: 400,
    depth: 10,
    x: -360,
    y: 200,
    z: 1250,
    rotate: {
      y: -Math.PI / 2
    },
    skin: {
      transparent: true,
      opacity: 0.2,
      skinLeft: {
        transparent: true,
        img: 'door_left.png'
      },
      skinRight: {
        transparent: true,
        img: 'door_right.png'
      }
    }
  },
  {
    uuid:"",
    name:'wall',
    type:"merge",
    parent:{
      uuid:"",
      name:'wall',
      type:'cube',
      width:10,
      height:500,
      depth:500,
      x:-700,
      y:250,
      z:2750,
      skin:{
        color:"#8da5b3"
      }
    },
    mergeChild:[
      {
        uuid:'',
        name:"wall",
        type:"cube",
        op:'-',
        width:10,
        height:400,
        depth:150,
        x:-700,
        y:200,
        z:2600,
        skin:{
          color:"#8da5b3"
        }
      }
    ]
  },
  {
    uuid:"",
    name:'financialRoom_door',
    type:"cube",
    width:150,
    height:400,
    depth:10,
    x:-700,
    y:200,
    z:2600,
    rotate:{
      y:-Math.PI / 2
    },
    skin:{
      color:'#fff',
      skinLeft:{
        img:"door_right.png",
        transparent:true,
      },
      skinRight:{
        img:'door_left.png',
        transparent:true,
      }
    }
  }
]
//墙对应的宽高
const whdArr = [{
    width: 10,
    depth: 500
  },
  {
    width: 400,
    depth: 10
  },
  {
    width: 350,
    depth: 10
  },
  {
    width: 350,
    depth: 10
  },
  {
    width: 300,
    depth: 10,
  },
  {
    width: 300,
    depth: 10,
  },
  {
    width: 400,
    depth: 10
  }
]
// 墙对应的xy
const xyzArr = [{
    x: -500,
    z: 2750,
  },
  {
    x: -800,
    z: 700
  },
  {
    x: -190,
    z: 1000
  },
  {
    x: -190,
    z: 1500
  },
  {
    x: -850,
    z: 2500
  },
  {
    x: -850,
    z: 1500
  },
  {
    x: -800,
    z: 1350
  }
]
whdArr.forEach((item, index) => {
  otherWall.push({
    uuid: '',
    name: 'wall',
    type: 'cube',
    width: item.width,
    height: 500,
    depth: item.depth,
    x: xyzArr[index].x,
    y: 250,
    z: xyzArr[index].z,
    skin: {
      color: '#8da5b3'
    }
  })
})

const wallAll = [
  ...wall,
  ...otherWall
]

export default wallAll;