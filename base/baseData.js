/*
 * @Author: E-Dreamer
 * @Date: 2021-09-13 08:45:44
 * @LastEditTime: 2021-09-13 13:50:55
 * @LastEditors: E-Dreamer
 * @Description: 一次渲染50个房间  等点击房间之后在渲染房间内部的内容
 */
const basedata = {
  uuid: "",
  name: "room",
  type: "group",
  x: 0,
  y: 0,
  z: 0,
  children: [
    {
      uuid:'',
      name:"name",
      type:'cube',
      width:200,
      height:200,
      depth:10,
      x:-350,
      y:250,
      z:1010,
      skin:{
        skinRight: {
          title: 'room',
          width: 150,
          height: 100
        }
      }
    },
    {
      uuid: '',
      name: "floor",
      type: "cube",
      width: 1000,
      height: 1000,
      depth: 20,
      x: 0,
      y: 10,
      z: 500,
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
      rotate: {
        x: Math.PI / 2
      }
    },
    {
      uuid: "",
      name: "wall",
      type: "cube",
      width: 1000,
      height: 500,
      depth: 20,
      x: 0,
      y: 250,
      z: 0,
      skin: {
        color: "#8da5b3"
      }
    },
    {
      uuid:'',
      name:'wall',
      type:"cube",
      width:20,
      depth:1000,
      height:500,
      x:490,
      y:250,
      z:500,
      skin:{
        color: "#8da5b3"
      }
    },
    {
      uuid:'',
      name:'wall',
      type:"cube",
      width:20,
      depth:1000,
      height:500,
      x:-490,
      y:250,
      z:500,
      skin:{
        color: "#8da5b3"
      }
    },
    {
      uuid: "",
      type: "merge",
      name: "wall",
      parent: {
        uuid: "",
        name: "wall",
        type: "cube",
        width: 1000,
        height: 500,
        depth: 20,
        x: 0,
        y: 250,
        z: 1000,
        skin: {
          color: "#8da5b3"
        }
      },
      mergeChild:[
        {
          uuid:"",
          name:"wall",
          type:'cube',
          width:400,
          height:400,
          depth:20,
          op:"-",
          x:0,
          y:200,
          z:1000,
          skin: {
            color: "#8da5b3"
          }
        }
      ]
    },
    {
      uuid:"",
      type:"cube",
      name:"baseDoorLeft",
      width:200,
      height:400,
      depth:20,
      x:-100,
      z:1000,
      y:200,
      skin:{
        color:0x51443e,
        skinRight:{
          img:"door_left.png",
          transparent:true
        },
        skinLeft:{
          img:"door_right.png",
          transparent:true
        }
      }
    },
    {
      uuid:"",
      type:"cube",
      name:"baseDoorRight",
      width:200,
      height:400,
      depth:20,
      x:100,
      z:1000,
      y:200,
      skin:{
        color:0x51443e,
        skinRight:{
          img:"door_right.png",
          transparent:true
        },
        skinLeft:{
          img:"door_left.png",
          transparent:true
        }
      }
    }
  ]
}
export default basedata