/*
 * @Author: 陈诚
 * @Date: 2021-08-30 09:58:35
 * @LastEditTime: 2021-08-31 17:04:29
 * @LastEditors: 陈诚
 * @Description: 洽谈室
 */
/*洽谈室的桌子 椅子*/
const receptionRoom = [{
  uuid: '',
  type: 'objloader',
  name: 'receptionRoom',
  objImg: 'table/table.obj',
  mtlImg: 'table/table.mtl',
  x: -180,
  y: 0,
  z: 1250,
  rotate: {
    x: -Math.PI / 2,
  },
  scale: {
    x: 4,
    y: 4,
    z: 4
  }
}]
for (let i = 0; i < 2; i++) {
  receptionRoom.push({
    uuid: '',
    type: 'objloader',
    name: 'receptionRoom',
    objImg: 'sofa/sofa.obj',
    mtlImg: 'sofa/sofa.mtl',
    x: -180,
    y: 0,
    z: i === 0 ? 1100 : 1400,
    rotate: {
      x: -Math.PI / 2,
      z: i === 1 ? Math.PI : 0
    },
    scale: {
      x: 2.5,
      y: 2.5,
      z: 2.5
    }
  })
}
export default receptionRoom;