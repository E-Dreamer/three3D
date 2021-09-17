/*
 * @Author: 陈诚
 * @Date: 2021-08-30 09:44:20
 * @LastEditTime: 2021-08-31 13:50:09
 * @LastEditors: 陈诚
 * @Description: 会议室
 */
// 会议室
const meetingRoom = [
  // 左墩
  {
    uuid: "",
    name: 'wall',
    type: 'cube',
    width: 200,
    height: 500,
    depth: 200,
    x: 1000,
    y: 250,
    z: 100,
    skin: {
      color: '#8da5b3',
    },
    rotate: {
      x: 0,
      y: Math.PI / 2,
      z: 0
    }
  },
  // 右墩
  {
    uuid: "",
    name: 'wall',
    type: 'cube',
    width: 200,
    height: 500,
    depth: 200,
    x: 1000,
    y: 250,
    z: 900,
    skin: {
      color: '#8da5b3',
    },
    rotate: {
      x: 0,
      y: Math.PI / 2,
      z: 0
    }
  },
  // 右墙
  {
    uuid: "",
    name: 'wall',
    type: 'cube',
    width: 1000,
    height: 500,
    depth: 10,
    x: 1500,
    y: 250,
    z: 1000,
    skin: {
      color: '#8da5b3',
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  // 左墙
  {
    uuid: "",
    name: 'wall',
    type: 'cube',
    width: 1000,
    height: 500,
    depth: 10,
    x: 1500,
    y: 250,
    z: 0,
    skin: {
      color: '#8da5b3',
    },
    rotate: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  // 内墙
  {
    uuid: "",
    name: 'wall',
    type: 'cube',
    width: 1000,
    height: 500,
    depth: 10,
    x: 2000,
    y: 250,
    z: 500,
    skin: {
      color: '#8da5b3',
    },
    rotate: {
      x: 0,
      y: Math.PI / 2,
      z: 0
    }
  },
  // 门上墙
  {
    uuid: "",
    name: 'wall',
    type: 'cube',
    width: 700,
    height: 50,
    depth: 200,
    x: 1000,
    y: 450,
    z: 450,
    skin: {
      color: '#8da5b3',
    },
    rotate: {
      x: 0,
      y: Math.PI / 2,
      z: 0
    }
  },
  {
    uuid: '',
    name: 'doorLeft',
    type: 'cube',
    width: 300,
    height: 420,
    depth: 8,
    x: 1000,
    y: 210,
    z: 350,
    skin: {
      color: 0x51443e,
      skinLeft: {
        img: 'door_left.png',
        transparent: true
      },
      skinRight: {
        img: 'door_right.png',
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
    uuid: '',
    name: 'doorRight',
    type: 'cube',
    width: 300,
    height: 420,
    depth: 4,
    x: 1000,
    y: 210,
    z: 650,
    skin: {
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
// 会议室的桌
const meetingRoom_tables = [{
  uuid: '',
  name: 'table',
  type: 'group',
  x: 1500,
  y: 250,
  z: 500,
  children: [{
    uuid: "",
    name: 'table',
    type: 'cube',
    width: 300,
    height: 800,
    depth: 20,
    x: 0,
    y: 0,
    z: 0,
    skin: {
      color: "#fff",
      img: "bbb.png"
    },
    rotate: {
      x: Math.PI / 2,
      y: 0,
      z: 0
    }
  }]
}]
// 会议室桌子的腿
const chairZ = [-300, 0, 300]
const deg = Math.PI / 10;
for (let i = 0; i < 2; i++) {
  for (let j = 0; j < 3; j++) {
    meetingRoom_tables[0].children.push({
      uuid: '',
      name: "table_leg",
      type: 'cylinder',
      width: 10, // top 
      height: 5, // bottom
      depth: 250, //height
      x: i === 0 ? -150 : 150,
      y: -125,
      z: chairZ[j],
      skin: {
        color: '#fff',
        img: "bbb.png"
      },
      rotate: {
        x: 0,
        y: 0,
        z: i === 0 ? -deg : deg
      }
    })
  }
}
// 会议室的屏幕
const meetingRoom_screen = [{
  uuid: '',
  type: 'cube',
  name: 'screen',
  width: 600,
  height: 300,
  depth: 10,
  x: 1500,
  y: 250,
  z: 990,
  skin: {
    color: '#000',
    skinLeft: {
      img: 'tv.jpg'
    }
  }
}]

// 会议室椅子
const meetingRoom_chair = []
for (let i = 0; i < 10; i++) {
  meetingRoom_chair.push({
    uuid: '',
    name: 'chair',
    type: 'group',
    x: i <= 4 ? 1200 : 1800,
    y: 100,
    z: (i <= 4 ? 150 : -700) + (i * 170),
    rotate: i > 4 ? {
      y: Math.PI
    } : null,
    children: [
      // 底座
      {
        uuid: '',
        type: 'cube',
        width: 100,
        height: 30,
        depth: 100,
        x: 0,
        y: 0,
        z: 0,
        skin: {
          color: '#fff',
          img: "bbb.png"
        }
      },
      // 靠背
      {
        uuid: "",
        type: 'cube',
        width: 10,
        height: 150,
        depth: 100,
        x: -55,
        y: 85,
        z: 0,
        skin: {
          color: '#fff',
          img: 'bbb.png'
        },
        rotate: {
          z: Math.PI / 18
        }
      },
      {
        uuid: "",
        type: 'cylinder',
        width: 5,
        height: 5,
        depth: 100,
        x: -50,
        y: -50,
        z: -45,
        skin: {
          color: '#fff',
          img: 'bbb.png'
        }
      },
      {
        uuid: "",
        type: 'cylinder',
        width: 5,
        height: 5,
        depth: 100,
        x: -50,
        y: -50,
        z: 45,
        skin: {
          color: '#fff',
          img: 'bbb.png'
        }
      },
      {
        uuid: "",
        type: 'cylinder',
        width: 5,
        height: 5,
        depth: 100,
        x: 50,
        y: -50,
        z: 45,
        skin: {
          color: '#fff',
          img: 'bbb.png'
        }
      },
      {
        uuid: "",
        type: 'cylinder',
        width: 5,
        height: 5,
        depth: 100,
        x: 50,
        y: -50,
        z: -45,
        skin: {
          color: '#fff',
          img: 'bbb.png'
        }
      },
    ]
  })
}
const meetingRoomAll = [
  ...meetingRoom,
  ...meetingRoom_tables,
  ...meetingRoom_screen,
  ...meetingRoom_chair
]
export default meetingRoomAll