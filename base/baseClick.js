/*
 * @Author: E-Dreamer
 * @Date: 2021-09-13 09:44:38
 * @LastEditTime: 2021-09-14 15:57:28
 * @LastEditors: E-Dreamer
 * @Description: 
 */
const mouseEvent = {
  click: [{
      obj_name: 'baseDoorLeft',
      obj_event(obj) {
        this.openDoor(obj, 'left', '+', 'x')
      }
    },
    {
      obj_name: 'baseDoorRight',
      obj_event(obj) {
        this.openDoor(obj, 'right', '+', 'x')
      }
    },
    {
      obj_name: 'doorName',
      obj_event(obj) {
        this.openDoor(obj, 'right')
        this.createCard(obj)
      }
    }
  ],
  hover: [

  ]
}

export default mouseEvent