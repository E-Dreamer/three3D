/*
 * @Author: 陈诚
 * @Date: 2021-08-30 09:57:23
 * @LastEditTime: 2021-08-31 17:04:44
 * @LastEditors: 陈诚
 * @Description: 茶水间
 */
/*茶水间的桌子*/
const teaRoom = [{
  uuid: '',
  name: 'teaRoom_tables',
  type: 'group',
  x: -950,
  y: 0,
  z: 175,
  children: [
    //  上面
    {
      uuid: '',
      name: 'teaRoom_tables',
      type: 'cube',
      width: 100,
      height: 10,
      depth: 350,
      x: 0,
      y: 200,
      z: 0,
      skin: {
        color: '#fff'
      }
    },
    //  底面
    {
      uuid: '',
      name: 'teaRoom_tables',
      type: 'cube',
      width: 100,
      height: 2,
      depth: 350,
      x: 0,
      y: 0,
      z: 0,
      skin: {
        color: '#fff'
      }
    },
    //  左右两边
    {
      uuid: '',
      name: 'teaRoom_tables',
      type: 'cube',
      width: 90,
      height: 200,
      depth: 10,
      x: 0,
      y: 100,
      z: 170,
      skin: {
        color: '#fff'
      }
    },
    {
      uuid: '',
      name: 'teaRoom_tables',
      type: 'cube',
      width: 90,
      height: 200,
      depth: 10,
      x: 0,
      y: 100,
      z: -170,
      skin: {
        color: '#fff'
      }
    },

    //左门
    {
      uuid: '',
      name: 'teaRoom_tables_leftdoor',
      type: 'cube',
      width: 87,
      height: 190,
      depth: 5,
      x: 45,
      y: 100,
      z: -129,
      skin: {
        transparent: true,
        opacity: 0.3,
        color: '#fff',
        skinLeft: {
          transparent: true,
          img: 'door_right.png'
        },
        skinRight: {
          transparent: true,
          img: 'door_left.png'
        }
      },
      rotate: {
        y: -Math.PI / 2
      }
    },
    {
      uuid: '',
      name: 'teaRoom_tables_leftdoor',
      type: 'cube',
      width: 87,
      height: 190,
      depth: 5,
      x: 45,
      y: 100,
      z: 42,
      skin: {
        color: '#fff',
        transparent: true,
        opacity: 0.3,
        skinLeft: {
          transparent: true,
          img: 'door_right.png'
        },
        skinRight: {
          transparent: true,
          img: 'door_left.png'
        }
      },
      rotate: {
        y: -Math.PI / 2
      }
    },
    //  右门
    {
      uuid: '',
      name: 'teaRoom_tables_rightdoor',
      type: 'cube',
      width: 87,
      height: 190,
      depth: 5,
      x: 45,
      y: 100,
      z: 129,
      skin: {
        color: '#fff',
        transparent: true,
        opacity: 0.3,
        skinLeft: {
          transparent: true,
          img: 'door_left.png'
        },
        skinRight: {
          transparent: true,
          img: 'door_right.png'
        }
      },
      rotate: {
        y: -Math.PI / 2
      }
    },
    {
      uuid: '',
      name: 'teaRoom_tables_rightdoor',
      type: 'cube',
      width: 87,
      height: 190,
      depth: 5,
      x: 45,
      y: 100,
      z: -42,
      skin: {
        color: '#fff',
        transparent: true,
        opacity: 0.3,
        skinLeft: {
          transparent: true,
          img: 'door_left.png'
        },
        skinRight: {
          transparent: true,
          img: 'door_right.png'
        }
      },
      rotate: {
        y: -Math.PI / 2
      }
    }
  ]
}]
// 微波炉
teaRoom.push(
  {
    uuid:'',
    name:'Microwave',
    type:'objloader',
    objImg:'Microwave/Microwave.obj',
    mtlImg:'Microwave/Microwave.mtl',
    x:-950,
    y:200,
    z:300,
    rotate:{
      x:-Math.PI / 2,
      z: Math.PI /2
    },
    scale:{
      x:1,
      y:1,
      z:1
    }
  }
)
export default teaRoom