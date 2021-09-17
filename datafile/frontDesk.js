/*
 * @Author: 陈诚
 * @Date: 2021-09-01 11:28:05
 * @LastEditTime: 2021-09-01 15:51:22
 * @LastEditors: 陈诚
 * @Description: 
 */
const frontDesk = [{
    uuid: '',
    type: 'group',
    name: 'frontDesk',
    x: -750,
    y: 0,
    z: 2200,
    children: [{
        type: "merge",
        parent: {
          uuid: '',
          type: 'cube',
          name: 'frontDesk',
          width: 100,
          height: 200,
          depth: 700,
          x: 0,
          y: 100,
          z: -100,
          skin: {
            color: '#fff'
          }
        },
        mergeChild: [{
          uuid: "",
          name: 'frontDesk',
          type: "cube",
          op: "-",
          width: 90,
          height: 80,
          depth: 700,
          x: -10,
          y: 200,
          z: -100,
          skin: {
            color: "#fff"
          }
        }]
      },
      {
        uuid: "",
        name: 'wall',
        type: "cube",
        width: 50,
        height: 50,
        depth: 1000,
        x: 25,
        y: 400,
        z: -200,
        skin: {
          color: "#8da5b3"
        }
      },
      {
        uuid: "",
        name: 'logo',
        type: 'group',
        x: 0,
        z: -550,
        y: 0,
        children: [{
            uuid: "",
            type: "cylinder",
            name: 'logo',
            width: 5,
            height: 5,
            depth: 50,
            x: 0,
            y: 350,
            z: 0,
            skin: {
              color: "#fff"
            }
          },
          {
            uuid: '',
            type: 'cube',
            name: 'logo',
            width: 10,
            height: 50,
            depth: 150,
            x: 0,
            z: 0,
            y: 300,
            skin: {
              skinBack: {
                title: '湖南XX有限公司',
                width: 300,
                height: 50
              }
            }
          }
        ]
      },
    ]
  },
  {
    uuid: "",
    type: 'objloader',
    name: "telephone",
    objImg: "telephone/telephone.obj",
    mtlImg: "telephone/telephone.mtl",
    x: -760,
    y: 160,
    z: 2400,
    rotate: {
      x: -Math.PI / 2,
      z: -Math.PI / 2
    },
    scale: {
      x: 0.3,
      y: 0.3,
      z: 0.3
    }
  },
  {
    uuid: "",
    name: 'frontDesk',
    type: 'objloader',
    objImg: 'computer/computer.obj',
    mtlImg: 'computer/computer.mtl',
    x: -770,
    z: 2200,
    y: 160,
    rotate: {
      x: -Math.PI / 2,
      z: -Math.PI / 2
    },
    scale: {
      x: 0.15,
      y: 0.15,
      z: 0.15
    }
  },
  {
    uuid: '',
    name: 'frontDesk',
    type: "objloader",
    objImg: 'chair/chair.obj',
    mtlImg: 'chair/chair.mtl',
    x: -920,
    z: 2200,
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
  },
  {
    uuid: "",
    name: 'frontDesk',
    type: 'objloader',
    objImg: 'potPlant/potPlant.obj',
    mtlImg: 'potPlant/potPlant.mtl',
    x: -760,
    y: 160,
    z: 2000,
    rotate: {
      x: -Math.PI / 2
    },
    scale: {
      x: 0.1,
      y: 0.1,
      z: 0.1
    }
  },
  {
    uuid: "",
    name: 'frontDesk',
    type: 'objloader',
    objImg: 'floorPlant/floorPlant.obj',
    mtlImg: "floorPlant/floorPlant.mtl",
    x: -900,
    y: 0,
    z: 1600,
    rotate: {
      x: -Math.PI / 2
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    }
  }
]

export default frontDesk;