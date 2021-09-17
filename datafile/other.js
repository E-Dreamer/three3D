/*
 * @Date: 2021-08-31 10:51:58
 * @LastEditTime: 2021-09-01 11:18:17
 * @Description: 其他的一些数据
 */

//冰箱
const refrigerator = [{
  uuid: '',
  name: 'refrigerator',
  type: 'group',
  x: -900,
  y: 0,
  z: 550,
  children: [
    //  底部
    {
      uuid: '',
      name: 'refrigerator',
      type: 'cube',
      x: 0,
      y: 10,
      z: 0,
      width: 200,
      height: 10,
      depth: 250,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    //    顶部
    {
      uuid: '',
      name: 'refrigerator',
      type: 'cube',
      x: 0,
      y: 410,
      z: 0,
      width: 200,
      height: 10,
      depth: 250,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    // 背部
    {
      uuid: '',
      name: 'refrigerator',
      type: 'cube',
      width: 10,
      height: 400,
      depth: 250,
      x: -90,
      y: 210,
      z: 0,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    //    左右两边
    {
      uuid: '',
      name: 'refrigerator',
      type: 'cube',
      width: 200,
      height: 400,
      depth: 10,
      x: 0,
      y: 210,
      z: 120,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    {
      uuid: '',
      name: 'refrigerator',
      type: 'cube',
      width: 200,
      height: 400,
      depth: 10,
      x: 0,
      y: 210,
      z: -120,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    //    下面两个盒子
    {
      uuid: '',
      name: 'refrigerator_cube',
      type: 'cube',
      width: 190,
      height: 100,
      depth: 230,
      x: 10,
      y: 60,
      z: 0,
      skin: {
        skinUp: {
          transparent: true,
          opacity: 0.1,
        },
        img: 'bxmesh.jpg',
      }
    },
    {
      uuid: '',
      name: 'refrigerator_cube',
      type: 'cube',
      width: 190,
      height: 100,
      depth: 230,
      x: 10,
      y: 160,
      z: 0,
      skin: {
        skinUp: {
          transparent: true,
          opacity: 0.1,
        },
        img: 'bxmesh.jpg',
      }
    },
    //  上部的左右门
    {
      uuid: '',
      name: 'refrigerator_leftDoor',
      type: 'cube',
      width: 120,
      height: 200,
      depth: 10,
      x: 90,
      y: 310,
      z: 60,
      skin: {
        skinRight: {
          img: 'bxleft_door.jpg'
        },
        img: "bxmesh.jpg"
      },
      rotate: {
        y: Math.PI / 2
      }
    },
    {
      uuid: '',
      name: 'refrigerator_rightDoor',
      type: 'cube',
      width: 120,
      height: 200,
      depth: 10,
      x: 90,
      y: 310,
      z: -60,
      skin: {
        skinBack: {
          img: 'bxright_door.jpg'
        },
        img: "bxmesh.jpg"
      },
      rotate: {
        y: Math.PI / 2
      }
    }
  ]
}]

// 饮水机
const waterDispenser = [{
  uuid: '',
  name: 'waterDispenser',
  type: 'group',
  x: -700,
  y: 0,
  z: 250,
  children: [
    // 底部
    {
      uuid: '',
      type: 'cube',
      name: 'waterDispenser',
      width: 150,
      height: 10,
      depth: 200,
      x: 0,
      y: 5,
      z: 0,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    // 顶部
    {
      uuid: '',
      type: 'cube',
      name: 'waterDispenser',
      width: 150,
      height: 10,
      depth: 190,
      x: 0,
      y: 200,
      z: 0,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    // 最上面的
    {
      uuid: '',
      type: 'cube',
      name: 'waterDispenser',
      width: 150,
      height: 30,
      depth: 200,
      x: 0,
      y: 300,
      z: 0,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    {
      uuid: '',
      type: 'cube',
      name: 'waterDispenser',
      width: 100,
      height: 30,
      depth: 100,
      x: 0,
      y: 270,
      z: -50,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    {
      uuid: "",
      type: 'cylinder',
      name: 'waterDispenser',
      width: 5,
      height: 5,
      depth: 10,
      x: 0,
      y: 250,
      z: -50,
      skin: {
        color: '#fff'
      }
    },
    {
      uuid: "",
      type: 'cylinder',
      name: 'waterDispenser',
      width: 5,
      height: 5,
      depth: 10,
      x: 0,
      y: 280,
      z: 50,
      skin: {
        color: '#fff'
      }
    },
    {
      uuid: '',
      type: 'cylinder',
      name: 'waterDispenser',
      width: 10,
      height: 10,
      depth: 5,
      x: 0,
      y: 210,
      z: 50,
      skin: {
        color: "#fff"
      },
      // openEnded:true
    },
    {
      uuid: '',
      type: 'cylinder',
      name: 'waterDispenser',
      width: 5,
      height: 5,
      depth: 5,
      radial: 24,
      x: 0,
      y: 210,
      z: 50,
      skin: {
        color: "#fff"
      },
      // openEnded:true
    },
    // 背面
    {
      uuid: "",
      type: 'cube',
      name: 'waterDispenser',
      width: 10,
      height: 300,
      depth: 200,
      x: 70,
      y: 150,
      z: 0,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    // 左右
    {
      uuid: '',
      name: 'waterDispenser',
      type: 'cube',
      width: 150,
      height: 210,
      depth: 10,
      x: 0,
      y: 100,
      z: -100,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    {
      uuid: "",
      name: 'waterDispenser',
      type: 'cube',
      width: 150,
      height: 210,
      depth: 10,
      x: 0,
      y: 100,
      z: 100,
      skin: {
        img: 'bxmesh.jpg'
      }
    },
    // {
    //   uuid: "",
    //   name: 'waterDispenser',
    //   type: 'cube',
    //   width: 200,
    //   height: 130,
    //   depth: 10,
    //   x: -75,
    //   y: 65,
    //   z: 0,
    //   rotate:{
    //     y: - Math.PI / 2
    //   },
    //   skin: {
    //     img: 'bxmesh.jpg'
    //   }
    // },
  ]
}]

// 水桶
const waterBucket = [{
  uuid: '',
  type: 'group',
  name: "waterBucket",
  x: -700,
  y: 135,
  z: 250,
  children: [{
      type: "merge",
      parent: {
        uuid: '',
        name: 'waterBucket',
        type: 'cylinder',
        width: 10,
        height: 10,
        depth: 1,
        radial: 24,
        x: 0,
        y: 0,
        z: 0,
        skin: {
          color: '#fff'
        }
      },
      mergeChild: [{
        uuid: '',
        op: '-',
        name: 'waterBucket',
        type: 'cylinder',
        width: 5,
        height: 5,
        depth: 1,
        radial: 24,
        x: 0,
        y: 0,
        z: 0,
        skin: {
          color: '#fff'
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 9,
        height: 9,
        depth: 20,
        radial: 24,
        x: 0,
        y: -10,
        z: 0,
        skin: {
          color: '#fff'
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 7,
        height: 7,
        depth: 20,
        radial: 24,
        x: 0,
        y: -10,
        z: 0,
        skin: {
          color: '#fff'
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 9,
        height: 9,
        depth: 10,
        radial: 24,
        x: 0,
        y: -25,
        z: 0,
        skin: {
          // color: 'blue'
          map: "bucket.jpg",
          transparent: true,
          opacity: 0.6
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 7,
        height: 7,
        depth: 10,
        radial: 24,
        x: 0,
        y: -25,
        z: 0,
        skin: {
          color: 'blue'
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 10,
        height: 10,
        depth: 2,
        radial: 24,
        x: 0,
        y: -30,
        z: 0,
        skin: {
          map: "bucket.jpg",
          transparent: true,
          opacity: 0.6
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 8,
        height: 8,
        depth: 2,
        radial: 24,
        x: 0,
        y: -30,
        z: 0,
        skin: {
          map: "bucket.jpg",
          transparent: true,
          opacity: 0.6
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 9,
        height: 40,
        depth: 20,
        radial: 24,
        x: 0,
        y: -35,
        z: 0,
        skin: {
          map: "bucket.jpg",
          transparent: true,
          opacity: 0.6
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 7,
        height: 38,
        depth: 20,
        radial: 24,
        x: 0,
        y: -35,
        z: 0,
        skin: {
          color: 'blue'
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 40,
        height: 40,
        depth: 5,
        radial: 24,
        x: 0,
        y: -47,
        z: 0,
        skin: {
          map: "bucket1.jpg",
          transparent: true,
          opacity: 0.6
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 38,
        height: 38,
        depth: 5,
        radial: 24,
        x: 0,
        y: -47,
        z: 0,
        skin: {
          color: 'blue'
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 44,
        height: 44,
        depth: 10,
        radial: 24,
        x: 0,
        y: -50,
        z: 0,
        skin: {
          map: "bucket1.jpg",
          transparent: true,
          opacity: 0.6
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 40,
        height: 40,
        depth: 10,
        radial: 24,
        x: 0,
        y: -50,
        z: 0,
        skin: {
          color: 'blue'
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 40,
        height: 40,
        depth: 30,
        radial: 24,
        x: 0,
        y: -70,
        z: 0,
        skin: {
          map: "bucket.jpg",
          transparent: true,
          opacity: 0.6
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 38,
        height: 38,
        depth: 30,
        radial: 24,
        x: 0,
        y: -70,
        z: 0,
        skin: {
          color: 'blue'
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 44,
        height: 44,
        depth: 10,
        radial: 24,
        x: 0,
        y: -80,
        z: 0,
        skin: {
          map: "bucket.jpg",
          transparent: true,
          opacity: 0.6
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 40,
        height: 40,
        depth: 10,
        radial: 24,
        x: 0,
        y: -80,
        z: 0,
        skin: {
          color: 'blue'
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 40,
        height: 40,
        depth: 40,
        radial: 24,
        x: 0,
        y: -100,
        z: 0,
        skin: {
          map: "bucket.jpg",
          transparent: true,
          opacity: 0.6
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 38,
        height: 38,
        depth: 40,
        radial: 24,
        x: 0,
        y: -100,
        z: 0,
        skin: {
          color: 'blue'
        }
      }]
    },
    {
      type: "merge",
      parent: {
        uuid: "",
        type: "cylinder",
        name: 'waterBucket',
        width: 44,
        height: 44,
        depth: 10,
        radial: 24,
        x: 0,
        y: -125,
        z: 0,
        skin: {
          map: "bucket.jpg",
          transparent: true,
          opacity: 0.6
        }
      },
      mergeChild: [{
        uuid: "",
        op: '-',
        type: "cylinder",
        name: 'waterBucket',
        width: 40,
        height: 40,
        depth: 8,
        radial: 24,
        x: 0,
        y: -125,
        z: 0,
        skin: {
          color: 'blue'
        }
      }]
    },
    // 水管
    {
      uuid: "",
      type: 'cylinder',
      name: "waterBucket",
      width: 5,
      height: 5,
      depth: 70,
      x: 0,
      y: 30,
      z: 0,
      skin: {
        map: "bucket.jpg",
        transparent: true,
        opacity: 0.6
      }
    }
  ]
}]
//地插
const socket =  {
  uuid: '',
  name: 'socket',
  type: 'group',
  x: -200,
  y: 0,
  z: 350,
  children: [{
      uuid: '',
      type: 'merge',
      parent: {
        name: 'socket',
        uuid: "",
        type: 'cube',
        width: 50,
        height: 5,
        depth: 50,
        x: 0,
        y: 5,
        z: 0,
        skin: {
          color: '#000'
        }
      },
      mergeChild: [{
        uuid: '',
        op: '-',
        type: 'cube',
        width: 40,
        height: 5,
        depth: 40,
        x: 0,
        y: 5,
        z: 0,
        skin: {
          color: '#000'
        }
      }]
    },
    {
      uuid: '',
      type: 'group',
      name: 'socket',
      x: 0,
      y: 20,
      z: -25,
      rotate: {
        x: Math.PI / 2
      },
      children: [{
          uuid: '',
          name: 'socket',
          type: 'cube',
          width: 50,
          height: 5,
          depth: 50,
          x: 0,
          y: 0,
          z: 0,
          skin: {
            color: '#fff'
          }
        },
        {
          uuid: '',
          name: 'socket',
          type: 'cube',
          width: 40,
          height: 6,
          depth: 40,
          x: 0,
          y: 6,
          z: 0,
          skin: {
            color: '#000'
          }
        },
        {
          uuid: '',
          type: 'cube',
          name: 'socket',
          width: 15,
          height: 6,
          depth: 5,
          x: 10,
          y: 6.5,
          z: -10,
          rotate: {
            y: -Math.PI / 3
          },
          skin: {
            color: '#fff'
          }
        },
        {
          uuid: '',
          type: 'cube',
          name: 'socket',
          width: 15,
          height: 6,
          depth: 5,
          x: -10,
          y: 6.5,
          z: -10,
          rotate: {
            y: Math.PI / 3
          },
          skin: {
            color: '#fff'
          }
        },
        {
          uuid: '',
          type: 'cube',
          name: 'socket',
          width: 15,
          height: 6,
          depth: 5,
          x: 0,
          y: 6.5,
          z: 10,
          skin: {
            color: '#fff'
          },
          rotate: {
            y: Math.PI / 2
          }
        }
        // {
        //   uuid:'',
        //   type:'merge',
        //   parent:{
        //     uuid:'',
        //     name:'socket',
        //     type:'cube',
        //     width:40,
        //     height:6,
        //     depth:40,
        //     x:0,
        //     y:6,
        //     z:0,
        //     skin:{
        //       color:'#000'
        //     }
        //   },
        //   mergeChild: [
        //     {
        //       uuid:'',
        //       type:'cube',
        //       op:'-',
        //       width: 15,
        //       height:10,
        //       depth:5,
        //       x:10,
        //       y:6,
        //       z:-10,
        //       rotate:{
        //         y: - Math.PI / 3
        //       },
        //       skin:{
        //         color:'#fff'
        //       }
        //     },
        //     {
        //       uuid:'',
        //       type:'cube',
        //       op:'-',
        //       width: 15,
        //       height:10,
        //       depth:5,
        //       x:-10,
        //       y:6,
        //       z:-10,
        //       rotate:{
        //         y:  Math.PI / 3
        //       },
        //       skin:{
        //         color:'#fff'
        //       }
        //     },
        //   ]
        // }
      ]
    }
  ]
}

// 门禁
const RKE =  {
    uuid:'',
    type:'cube',
    name:'RKE',
    width:10,
    height:60,
    depth:40,
    x:20,
    y:300,
    z:1500,
    skin:{
      color:"#000",
      skinBack:{
        img:"doorControl.jpg"
      }
    }
}

// 监视器
const camera = [
  {
    uuid:"",
    name:"camera",
    type:"objloader",
    objImg:'camera/camera.obj',
    mtlImg:'camera/camera.mtl',
    x:-200,
    y:440,
    z:40,
    rotate:{
      // y:Math.PI / 8,

    },
    scale:{
      x:0.3,
      y:0.3,
      z:0.3
    }
  }
]

const other = [
  ...refrigerator,
  ...waterDispenser,
  ...waterBucket,
  ...camera,
  socket,
  RKE
]
export default other