/*
 * @Author: 陈诚
 * @Date: 2021-08-13 16:19:28
 * @LastEditTime: 2021-09-13 09:40:51
 * @LastEditors: E-Dreamer
 * @Description: 
 */
import meetingRoomAll from "./datafile/meetingRoom.js"
import officeArea from './datafile/office.js'
import floor from "./datafile/floor.js"
import glass from './datafile/glass.js'
import wallAll from "./datafile/wall.js"
import teaRoom from './datafile/teaRoom.js'
import receptionRoom from './datafile/receptionRoom.js'
import flower from './datafile/flower.js'
import bossRoom from './datafile/bossRoom.js'
import other from './datafile/other.js'
import financialRoom from './datafile/financialRoom.js'
import frontDesk from './datafile/frontDesk.js'
// 自动门
const gate = [{
    uuid: "",
    type: 'cube',
    name: 'gateDoorLeft',
    width: 400,
    height: 400,
    depth: 10,
    x: 0,
    y: 200,
    z: 1800,
    skin: {
      opacity: 0.1,
      color: 0x51443e,
      skinRight: {
        img: 'door_right.png',
        transparent: true
      },
      skinLeft: {
        img: 'door_left.png',
        transparent: true
      }
    },
    rotate: {
      x: 0,
      y: Math.PI / 2,
      z: 0
    }
  },
  {
    uuid: "",
    type: 'cube',
    name: 'gateDoorRight',
    width: 400,
    height: 400,
    depth: 10,
    x: 0,
    y: 200,
    z: 2200,
    skin: {
      opacity: 0.1,
      color: 0x51443e,
      skinLeft: {
        img: 'door_right.png',
        transparent: true
      },
      skinRight: {
        img: 'door_left.png',
        transparent: true
      }
    },
    rotate: {
      x: 0,
      y: Math.PI / 2,
      z: 0
    }
  }
]

// 机箱
const hollowCube = []
for(let i = 0;i<2; i++){
 for(let j = 0; j< 2;j++){
  hollowCube.push(
    {
      uuid: '',
      type: 'cabinet',
      name: 'cabGroup',
      width: 80,
      height: 200,
      depth: 5,
      x: j ==0 ? -80 : -150,
      y: 50,
      z: i === 0 ? 1350 : 1450,
      title: `A00${i+j + 1 }`, //机箱上面的标识字体
      skin: {
        color: 0x8E8E8E,
        skinUp: {
          img: 'rack_panel.jpg'
        },
        skinBottom: {
          img: 'rack_panel.jpg'
        },
        skinBack: {
          img: 'rack_panel.jpg'
        },
        skinLeft: {
          img: 'rack_panel.jpg', //整体的贴图
          frontimg: 'cabz.jpg' //前的贴图
        },
        skinRight: {
          img: 'rack_panel.jpg',
          frontimg: 'caby.jpg' //前的贴图
        }
      },
    }
  )
 }
}
const allData = {
  btns: [{
      id: 'Reset',
      name: '场景复位',
      img: '',
      event() {
        document.querySelector('#canvas').innerHTML = '';
        this.init();
      }
    },
    {
      id: 'Points',
      name: '粒子效果',
      img: '',
      event() {

      }
    },
    {
      id: 'Tract',
      name: '运行轨迹',
      img: "",
      event() {
        this.initTrack();
      }
    }
  ],
  objects: [
    // 地板
    ...floor,
    // 墙体
    ...wallAll,
    // 外墙玻璃
    ...glass,
    //会议室
    ...meetingRoomAll,
    //自动门
    ...gate,
    //办公室相关
    ...officeArea,
    // 茶水间
    ...teaRoom,
    // 洽谈室
    ...receptionRoom,
    // 花
    ...flower,
    // 其他
    ...other,
    // 经理室
    ...bossRoom,
    // 机箱
    ...hollowCube,
    // 财务室
    ...financialRoom,
    // 前台
    ...frontDesk,
    // 大门墙 挖洞了
    {
      uuid: "",
      type: "merge",
      parent: {
        uuid: "",
        name: 'wall',
        type: 'cube',
        width: 2000,
        height: 500,
        depth: 30,
        x: 0,
        y: 250,
        z: 2000,
        skin: {
          color: '#8da5b3',
        },
        rotate: {
          x: 0,
          y: Math.PI / 2,
          z: 0
        },
      },
      mergeChild: [{
        type: 'cube',
        op: '-',
        width: 800,
        height: 400,
        depth: 30,
        x: 0,
        y: 200,
        z: 2000,
        skin: {
          // color: '#8da5b3',
          color: 'red'
        },
        rotate: {
          x: 0,
          y: Math.PI / 2,
          z: 0
        },
      }]
    },
  ],
  mouseEvent: {
    click: [{
        obj_name: 'doorLeft',
        obj_event(obj) {
          this.openDoor(obj, 'left')
        }
      },
      {
        obj_name: 'doorRight',
        obj_event(obj) {
          this.openDoor(obj, 'right')
        }
      },
      {
        findObject(objname) {
          return objname && objname.indexOf('gateDoor') > -1
        },
        obj_event(obj) {
          this.opengateDoor(obj)
        }
      },
      {
        obj_name: 'hollowCube',
        obj_event(obj) {
          openCubeOneFace(obj)
        }
      },
      {
        obj_name: 'teaRoom_tables_leftdoor',
        obj_event(obj) {
          this.openDoor(obj, 'left', '-')
        }
      },
      {
        obj_name: 'teaRoom_tables_rightdoor',
        obj_event(obj) {
          this.openDoor(obj, 'right', '-')
        }
      },
      {
        obj_name: 'receptionRoomDoor',
        obj_event(obj) {
          this.openDoor(obj, 'right')
        }
      },
      {
        obj_name: 'refrigerator_leftDoor',
        obj_event(obj) {
          this.openDoor(obj, 'right', '-')
        }
      }, ,
      {
        obj_name: 'refrigerator_rightDoor',
        obj_event(obj) {
          this.openDoor(obj, 'left', '-')
        }
      },
      {
        obj_name: 'refrigerator_cube',
        obj_event(obj) {
          this.openDrawer(obj)
        }
      },
      {
        obj_name: 'bossRoomDoor',
        obj_event(obj) {
          this.openDoor(obj, 'right')
        }
      },
      {
        obj_name : 'financialRoom_door',
        obj_event(obj){
          this.openDoor(obj,'left')
        }
      },
    ],
    hover: [{
      obj_name: 'cabGroup_men',
      obj_event(obj) {
        this.openDoor(obj, 'right')
      }
    }]
  }
}

export default allData