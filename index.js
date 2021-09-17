/*
 * @Author: 陈诚
 * @Date: 2021-08-13 16:28:15
 * @LastEditTime: 2021-09-14 17:12:03
 * @LastEditors: E-Dreamer
 * @Description: 
 */
// import allData from './data.js'
import {
  Lensflare,
  LensflareElement
} from './lib/objects/Lensflare.js'
import {
  throttle,
  getCurrentPosition,
  computeSunRiseSunSet,
  getPosition
} from './utils.js'
export default class Msj3D {
  constructor() {
    this.scene = null; //场景
    this.controls = null; //控制
    this.renderer = null; //渲染器
    this.camera = null; //摄像机 

    this.monitorCamera = null; //监视器摄像机
    this.monitorRender = null; //监视器渲染器

    this.stats = null;
    this.point = null; //光源
    this.light = null; //太阳光
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.btns = []; //按钮组
    this.objects = []; //所有要生成的物体数据
    this.sceneObject = []; //场景里的物体
    this.mouseEventList = {};
    this.SELECTED = null; // 选择的
    this.mouseClick = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.points = null; //全部粒子
    this.progressSuccess = 0; //objloader 加载多少个 控制loading的显示时间的
    this.startTime = Date.now();
    this.longitude = null; //经纬度
    this.sunData = null; // 日出日落的数据

    // 决定贴图的材质 某些材质是不会存在阴影的
    // 存在的值 Basic |  Lambert | Matcap | Phong | Physical | Standard | Toon
    this.material = 'Basic'

    // !this.scene && this.init();
  }
  onWindowResize() { //自适应
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  init() {
    this.Loading();
    this.getLngAndLat();
    this.initScene();
    this.initLight();
    this.initSun();
    this.initCamera();
    this.initRender();
    this.initContorls();
    this.statsHelper() //性能辅助
    this.initAxisHelper();
    this.initBtns();
    this.initObject();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.initfloor();
    this.moveSun();
  }

  // 只渲染基础的
  initBase() {
    this.initScene();
    this.initLight();
    this.initCamera();
    this.initRender();
    this.initContorls();
    this.statsHelper() //性能辅助
    this.initAxisHelper();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }
  /**
   * @description: 
   * @param {*} data 需要渲染的数据
   * @return {*} 
   */
  createObject(data) {
    this.objects = [...this.objects, ...data];
    this.objectFn(data)
  }
  async getLngAndLat() {
    this.longitude = await getCurrentPosition();
    this.longitude['UTC'] = (0 - new Date().getTimezoneOffset() / 60);

    if (this.longitude) {
      const res = computeSunRiseSunSet(this.longitude.lat, this.longitude.lng, this.longitude.UTC)
      this.sunData = {
        strSunRise: res.strSunRise,
        strSunSet: res.strSunSet,
        strSunRiseSecond: res.strSunRiseSecond,
        strSunSetSecond: res.strSunSetSecond
      }
    }
  }
  // 添加地面 用于接收阴影
  initfloor() {
    const material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide, // 将材质设置为双面，如果设置为单面，则只有一面能看见材质，另一面看着就是透明
      color: '#ccc', // 将材质设置为双面，如果设置为单面，则只有一面能看见材质，另一面看着就是透明
    });
    // 0x808080
    const geometry = new THREE.PlaneGeometry(6000, 6000, 32); // 一个长方形几何体，长宽都为100
    const cube = new THREE.Mesh(geometry, material); // 创建这个mesh对象
    cube.position.set(0, -25, 1000);
    cube.name = 'floor';
    cube.receiveShadow = true; // 将地面接收阴影的属性打开
    cube.rotateX(Math.PI / 2)
    this.addObject(cube);
  }
  /**
   * @description: 加载 
   * @param {*}
   * @return {*}
   */
  async Loading() {
    var div = document.createElement('div');
    div.setAttribute('class', 'loading');
    let span = document.createElement('span');
    span.innerHTML = '模型加载中...'
    span.setAttribute('class', 'text')
    div.appendChild(span);
    let loading = document.createElement('div');
    loading.setAttribute('class', 'spinner')
    div.appendChild(loading);
    document.body.appendChild(div);
  }
  /**
   * @description: 加载成功
   * @param {*}
   * @return {*}
   */
  LoadSuccess() {
    let _this = this;
    if (this.progressSuccess >= 28) {
      let load = document.body.querySelector(".loading");
      load.style.display = 'none'
    }
  }
  // 公用方法
  commonFunc = {
    // 设置rotate
    setRotate(mesh, rotate) {
      rotate.x && mesh.rotateX(rotate.x)
      rotate.y && mesh.rotateY(rotate.y)
      rotate.z && mesh.rotateZ(rotate.z)
    },
    // 查找对象
    findObject: (_objname) => {
      let findedobj = null;
      this.sceneObject.map((_obj) => {
        if (_obj.name != null && _obj.name != '') {
          if (_obj.name == _objname) {
            findedobj = _obj;
            return true;
          }
        }
      });
      return findedobj;
    },
    // 判断对象
    hasObj(_obj) {
      if (_obj != null && typeof _obj !== 'undefined') {
        return true;
      }
      return false;
    },
    // 复制对象
    cloneObj(obj, map = new Map()) {
      if (typeof obj === 'object' && obj !== null) {
        if (map.has(obj)) return map.get(obj);
        let data = Array.isArray(obj) ? [] : {};
        map.set(obj, data);
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            data[key] = this.cloneObj(obj[key], map);
          }
        }
        return data;
      }
      return obj;
    },
    setMaterials: (obj) => {
      let map = new Map();
      map.set('Basic', new THREE.MeshBasicMaterial(obj));
      map.set('Lambert', new THREE.MeshLambertMaterial(obj));
      map.set('Matcap', new THREE.MeshMatcapMaterial(obj));
      map.set('Phong', new THREE.MeshPhongMaterial(obj));
      map.set('Physical', new THREE.MeshPhysicalMaterial(obj));
      map.set('Standard', new THREE.MeshStandardMaterial(obj));
      map.set('Toon', new THREE.MeshToonMaterial(obj));
      // map.set('Depth', new THREE.MeshDepthMaterial(obj))
      // map.set('Normal', new THREE.MeshNormalMaterial(obj))
      return map.get(this.material);
    }
  }

  // 辅助坐标系
  initAxisHelper() {
    //  红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
    var axisHelper = new THREE.AxisHelper(1200);
    this.scene.add(axisHelper);
  }
  // 生成按钮
  initBtns() {
    const div = document.createElement('div');
    const canvas = document.querySelector('#canvas');
    div.id = 'toolbar'
    div.className = 'toolbar';
    canvas.appendChild(div);
    this.btns && this.btns.map(item => {
      const img = document.createElement('img');
      img.src = item.img || './images/floor.jpg'
      img.title = item.name
      img.id = item.id;
      img.style.cursor = 'pointer'
      div.appendChild(img);
      document.querySelector(`#${item.id}`).addEventListener('click', item.event.bind(this), false)
    })
  }
  // 生成所有物体
  initObject() {
    this.objectFn(this.objects)
  }
  /**
   * @description: 渲染对象的公共函数
   * @param {*} data 数组
   */
  objectFn(data) {
    data && data.forEach(item => {
      switch (item.type) {
        case 'cube':
          this.addObject(this.initCube(item));
          break;
        case 'plane':
          this.addObject(this.initPlane(item));
          break;
        case 'cylinder':
          this.addObject(this.initCylinder(item));
          break;
        case 'cabinet':
          this.addObject(this.initCabinet(item));
          break;
        case 'group':
          this.addObject(this.initGroup(item));
          break;
        case 'merge':
          this.addObject(...this.initMerge(item))
          break;
        case 'objloader':
          this.initObjLoader(item)
          break;
        case 'shape':
          this.addObject(this.initShape(item));
          break;
        default:
          break;
      }
    })
  }
  addObject(obj) {
    // Object.prototype.toString.call(obj) [object,Array] [object,Object]
    this.sceneObject.push(obj);
    this.scene.add(obj);
  }
  // 创建多边形
  initShape(obj) {
    let {
      x,
      y,
      z,
      skin,
      rotate,
      shapeArr
    } = obj;

    const arr = []
    shapeArr.forEach(item => {
      arr.push(new THREE.Vector2(item[0], item[1]))
    })
    const shape = new THREE.shape(arr)
    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const texture = new THREE.TextureLoader().load(`./images/${skin.img}`)
    const mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      map: texture || null,
      transparent: skin.transparent || false,
      opacity: skin.opacity || 1,
    }));
    mesh.position.set(x, y, z);
    rotate && this.commonFunc.setRotate(mesh, rotate);
    mesh.castShadow = true;
    return mesh;
  }
  // 创建二维平面
  initPlane(_obj) {
    const options = _obj;
    if (typeof options.pic === 'string') {
      // 传入的材质是图片路径，使用 textureloader加载图片作为材质
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin(this.crossOrigin);
      var texture = loader.load(
        `./images/${options.pic}`,
        function () {},
        undefined,
        function () {},
      );
    }
    const MaterParam = {
      // 颜色
      color: (options.skin && options.skin.color) || '#fff',
      // 材质的参数
      map: texture || null,
      // overdraw: true,
      side: options.double ? THREE.DoubleSide : THREE.FrontSide,
      // blending: THREE.AdditiveBlending,
      transparent: options.transparent,
      // needsUpdate:true,
      // premultipliedAlpha: true,
      opacity: options.opacity,
    };
    if (options.blending) {
      MaterParam.blending = THREE.AdditiveBlending; // 使用饱和度叠加渲染
    }
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(options.width, options.height, 1, 1),
      new THREE.MeshPhongMaterial(MaterParam), //一种用于具有镜面高光的光泽表面的材质。
    );
    plane.position.set(options.x, options.y, options.z);
    options.rotate && this.commonFunc.setRotate(plane, options.rotate)
    plane.name = options.name;
    plane.uuid = options.uuid;
    plane.castShadow = true;
    return plane;
  };
  // 圆柱或者三角柱
  initCylinder(obj) {
    let {
      width,
      depth,
      height,
      skin,
      radial,
      rotate
    } = obj;
    const heightSegments = obj.heightSegments || 1;
    const openEnded = obj.openEnded || false;
    const geometry = new THREE.CylinderGeometry(width, height, depth, radial, heightSegments, openEnded);
    let texture = null;
    if (skin.img) {
      texture = new THREE.TextureLoader().load(`./images/${skin.img}`)
    }
    const material = this.commonFunc.setMaterials({
      color: skin.color || '#fff',
      map: texture || null
    })
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(obj.x, obj.y, obj.z);
    rotate && this.commonFunc.setRotate(cylinder, rotate);
    cylinder.name = obj.name;
    cylinder.uuid = obj.uuid;
    cylinder.castShadow = true;
    return cylinder;
  }
  /**
   * @description: cube类型的每个面贴图
   * @param {*} obj //整个data对象
   * @param {*} skin //对象中的skin
   * @param {*} face //那个面
   * @return {*}
   */
  createCubeMaterial(obj, skin, face) {
    let map = null;
    if (skin[`skin${face}`] && skin[`skin${face}`].img) {
      map = this.createSkin(obj.width, obj.height, obj.skin[`skin${face}`])
    }
    if (skin[`skin${face}`] && skin[`skin${face}`].title) {
      map = this.canvasTxture(skin[`skin${face}`].width, skin[`skin${face}`].height, skin[`skin${face}`].title)
    }

    const material = skin[`skin${face}`] && this.commonFunc.setMaterials({
      map,
      transparent: skin[`skin${face}`].transparent || false,
      opacity: skin[`skin${face}`].opacity || 1,
      side: THREE.DoubleSide,
      color: skin[`skin${face}`].color || '#fff'
    })
    return material;
  }
  /**
   * @description: 重构的生成正方体
   * @param {*} obj 传递的数据
   * @param {*} flag 是否开启 定位
   * @return {*}
   */
  initCube(obj, flag = true) {
    const {
      width,
      height,
      depth,
      skin,
      x,
      y,
      z,
      rotate
    } = obj;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const basicTexture = skin && skin.img && this.createSkin(width, height, obj.skin)
    //  MeshBasicMaterial 不受光照的影响
    const basicobj = {
      color: skin.color || '#fff',
      transparent: (skin && skin.transparent) || false,
      opacity: (skin && skin.opacity) || 1,
      map: basicTexture || null,
      side: THREE.DoubleSide
    }
    const basicMaterial = this.commonFunc.setMaterials(basicobj)
    // 后面
    const backmaterial = skin && this.createCubeMaterial(obj, skin, 'Back')
    // 前面
    const frontmaterial = skin && this.createCubeMaterial(obj, skin, 'Front')
    const upmaterial = skin && this.createCubeMaterial(obj, skin, 'Up')
    const bottommaterial = skin && this.createCubeMaterial(obj, skin, 'Bottom')
    const leftmaterial = skin && this.createCubeMaterial(obj, skin, 'Left')
    const rightmaterial = skin && this.createCubeMaterial(obj, skin, 'Right')
    // 顺序 x前后 y前后 z前后   (front back x方向  left right 为z方向 up bottom 为y轴方向)
    const materials = [
      backmaterial || basicMaterial,
      frontmaterial || basicMaterial,
      upmaterial || basicMaterial,
      bottommaterial || basicMaterial,
      rightmaterial || basicMaterial,
      leftmaterial || basicMaterial
    ];
    const cube = new THREE.Mesh(geometry, materials);
    if (flag) {
      cube.position.set(x, y, z);
    }
    rotate && this.commonFunc.setRotate(cube, rotate)
    cube.castShadow = true; // 判断物体是否在关照下产生投影
    // cube.receiveShadow = true; // 是否接受其他模型的投影效果
    cube.uuid = obj.uuid; // 给物体添加一个id
    cube.name = obj.name; // 给物体添加一个name
    return cube;
  }
  /**
   * @description: 合并类型
   * @param {*} obj
   * @return {*} group组
   */
  initMerge(obj) {
    const {
      parent: pobj
    } = obj;
    const type = pobj && pobj.type
    let parent = null;
    obj.parent = this.commonFunc.cloneObj(obj.parent)
    switch (type) {
      case 'cube':
        parent = this.initCube(obj.parent)
        break;
      case "cylinder":
        parent = this.initCylinder(obj.parent)
        break;
      default:
        break;
    }
    let result = null;
    let Resultarr = []
    if (this.commonFunc.hasObj(obj.mergeChild)) {
      obj.mergeChild.length && obj.mergeChild.map((item, index) => {
        let childobj = null;
        switch (item.type) {
          case "cube":
            childobj = this.initCube(item);
            break;
          case "cylinder":
            childobj = this.initCylinder(item);
            break;
          default:
            break;
        }
        result = this.mergeModel(item.op, index === 0 ? parent : Resultarr[index - 1], childobj, pobj.skin)
        result.position.set(pobj.x, pobj.y, pobj.z);
        pobj.rotate && this.commonFunc.setRotate(result, pobj.rotate);
        result.name = pobj && pobj.name;
        result.uuid = pobj && pobj.uuid;
        result.castShadow = true;
        Resultarr.push(result)
      })
    }
    return Resultarr;
  }
  /**
   * @description:  柜子的每个面
   * @param {*} width 沿x的方向长度
   * @param {*} height 沿y轴方向的长度
   * @param {*} depth 沿z轴方向的长度
   * @param {*} postion 包含 x,y,z
   * @param {*} skin data数据对象的skin
   * @param {*} face  那个面 可选参数 [Left,Right,Bottom,Up,Front,Back]
   * @param {*} rotate 需要旋转的参数
   * @return {*} 每个面的基本参数
   */
  createCabinetFace(width, height, depth, position, skin, face, rotate) {
    const {
      x,
      y,
      z,
      objwidth,
      objheight,
      objdepth
    } = position;
    const texture = skin[`skin${face}`] && skin[`skin${face}`].img && new THREE.TextureLoader().load(`./images/${skin[`skin${face}`].img}`)
    const fronttexture = skin[`skin${face}`] && skin[`skin${face}`].frontimg && new THREE.TextureLoader().load(`./images/${skin[`skin${face}`].frontimg}`)
    const cube = new THREE.BoxGeometry(width, height, depth);
    const basicMaterial = this.commonFunc.setMaterials({ //设置基础材质和贴图
      color: skin.color || '#fff',
      transparent: skin.transparent || false,
      map: texture || null,
    })
    const frontMaterial = this.commonFunc.setMaterials({
      color: skin.color || '#fff',
      transparent: skin.transparent || false,
      map: fronttexture || null
    })
    let meterial = [];
    meterial.push( //x正反 y正反 z正反  
      basicMaterial,
      fronttexture ? frontMaterial : basicMaterial,
      basicMaterial,
      basicMaterial,
      basicMaterial,
      basicMaterial,
    )
    const mesh = new THREE.Mesh(cube, meterial)
    rotate && this.commonFunc.setRotate(mesh, rotate);
    switch (face) {
      case 'Left':
        mesh.position.set(x, y, z - objwidth / 2);
        break;
      case 'Right':
        mesh.position.set(x, y, z + objwidth / 2);
        break;
      case 'Bottom':
        mesh.position.set(x, y - objheight / 2, z);
        break;
      case 'Back':
        mesh.position.set(x + objwidth / 2 + objdepth / 2, y, z);
        break;
      default:
        break;
    }

    return mesh
  }
  /**
   * @description: 柜子顶部贴图
   * @param {*} str 字体内容
   * @return {*}
   */
  canvasTxture(width, height, str, color = '#00ffff') {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    // var g = ctx.createLinearGradient(0, 0, 50, 40);
    var g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#777");
    g.addColorStop(1, "#777");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    ctx.textBaseline = 'top';
    ctx.font = "40px SimHei";
    ctx.fillStyle = color; //编号颜色
    var txtWidth = ctx.measureText(str).width;
    ctx.fillText(str, (width - txtWidth) / 2, height / 4)
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
  // 生成柜子 可开门
  initCabinet(obj) {
    const {
      x,
      y,
      z,
      name,
      doorName,
      skin,
      width,
      height,
      depth,
      rotate,
      cavasWidth,
      cavasHeight
    } = obj
    const group = new THREE.Group()
    group.name = name;

    const position = {
      x,
      y,
      z,
      objwidth: width,
      objheight: height,
      objdepth: depth
    }
    const leftmesh = this.createCabinetFace(width, height + depth / 2, depth, position, skin, 'Left');
    const rightmesh = this.createCabinetFace(width, height + depth / 2, depth, position, skin, 'Right');
    // 下面
    const bottommesh = this.createCabinetFace(width, depth / 2, width, position, skin, 'Bottom')
    const backmesh = this.createCabinetFace(width + depth, height + depth / 2, depth, position, skin, 'Back', {
      y: Math.PI / 2
    })

    // 上面
    const geometry = new THREE.BoxGeometry(width, depth, width);
    const texture = skin.skinUp && skin.skinUp.img && new THREE.TextureLoader().load(`./images/${skin.skinUp.img}`)
    const material = []
    const basic = this.commonFunc.setMaterials({
      color: skin.color || '#fff',
      map: texture || null
    })
    material.push(
      basic,
      basic,
      this.commonFunc.setMaterials({
        color: skin.color || '#fff',
        map: this.canvasTxture(cavasWidth || width, cavasHeight || width, obj.title) || null
      }),
      basic,
      basic,
      basic
    )
    const upmesh = new THREE.Mesh(geometry, material)
    upmesh.position.set(x, y + height / 2 - depth / 2 + 1, z);
    upmesh.rotateY(-Math.PI / 2)

    const frontmesh = this.initCube({
      name: doorName || 'cabGroup_men',
      uuid: '',
      type: 'cube',
      width: width + depth,
      height: height,
      depth: 2,
      x: x - width / 2 - 1,
      y: y,
      z: z,
      skin: {
        color: skin.color,
        skinRight: {
          img: 'rack_door_back.jpg'
        },
        skinLeft: {
          img: 'rack_front_door.jpg'
        }
      },
      rotate: {
        x: 0,
        y: Math.PI / 2,
        z: 0
      }
    })
    group.add(leftmesh, rightmesh, bottommesh, backmesh, upmesh, frontmesh)
    group.position.set(x , y, z );
    rotate && this.commonFunc.setRotate(group, rotate)
    // const obj3d = new THREE.Object3D();
    // obj3d.position.set(x ,y,z );
    // group.position.set(x,y,z);
    // obj3d.add(group)
    return group
  }
  //生成机柜里面的机箱 
  createCard(obj) {
    const _box = obj.parent.parent;
    console.log(_box)
    let _height = 0; // 初始高度
    // let boxheight = _box.position.y + 200
    let boxheight = 200;
    let i = 0;
    let ontHeight; // 初始位置
    while (_height <= boxheight) {
      const _index = Math.random() * 2 > 1.5 ? 1 : 0;
      const card = [{
          uuid: "",
          name: 'card',
          type: "cube",
          width: 75,
          height: 30,
          depth: 75,
          x: 0,
          y: 15,
          z: 0,
          skin: {
            color: 'blue'
          }
        },
        {
          uuid: "",
          name: 'card',
          type: "cube",
          width: 75,
          height: 50,
          depth: 75,
          x: 0,
          y: 25,
          z: 0,
          skin: {
            color: '#000'
          }
        }
      ]
      const _card = card[_index];
      _card.x = _box.position.x *2;
      _card.z = _box.position.z * 2;

      if (i == 0) {
        ontHeight = _height + _card.height / 2;
        _card.y = ontHeight;
      } else {
        _card.y = _height;
      }

      if (_height + _card.height < boxheight + ontHeight) {
        const cube = this.initCube(_card);
        cube.parentName = _box.name
        this.addObject(cube);
        _height += _card.height;
      } else {
        return;
      }
      i++;
    }
  }
  // 生成组
  initGroup(obj) {
    let {
      x,
      y,
      z,
      rotate
    } = obj;
    const group = new THREE.Group();
    if (obj.children && obj.children.length) {
      obj.children.forEach(item => {
        switch (item.type) {
          case 'cube':
            group.add(this.initCube(item));
            break;
          case 'plane':
            group.add(this.initPlane(item));
            break;
          case 'cylinder':
            group.add(this.initCylinder(item));
            break;
          case 'cabinet':
            group.add(this.initCabinet(item));
            break;
          case 'merge':
            group.add(...this.initMerge(item))
            break;
          case "group":
            group.add(this.initGroup(item));
            break;
          case 'shape':
            group.add(this.initShape(item));
            break;
          default:
            break;
        }
      })
    }
    group.name = obj.name;
    group.uuid = obj.uuid;
    group.position.set(x, y, z)
    rotate && this.commonFunc.setRotate(group, rotate)
    return group
  }
  // obj mtl 3d模型加载
  initObjLoader(obj) {
    const {
      x,
      y,
      z,
      objImg,
      mtlImg,
      scale,
      rotate,
      name
    } = obj;
    const _this = this;
    const OBJLoader = new THREE.OBJLoader(); //obj加载器
    const MTLLoader = new THREE.MTLLoader(); //材质文件加载器
    MTLLoader.load(`./images/${mtlImg}`, function (materials) {
      // 返回一个包含材质的对象MaterialCreator
      // console.log(materials);
      //obj的模型会和MaterialCreator包含的材质对应起来
      OBJLoader.setMaterials(materials);
      OBJLoader.load(`./images/${objImg}`, function (obj) {
        scale && obj.scale.set(scale.x, scale.y, scale.z); //放大obj组对象
        rotate && _this.commonFunc.setRotate(obj, rotate)
        obj.position.set(x, y, z);
        obj.name = name;
        _this.progressSuccess += 1;
        // console.log(_this.progressSuccess)
        _this.LoadSuccess();
        _this.addObject(obj); //返回的组对象插入场景中
      })
    })
  }
  // 创建皮肤
  createSkin(flength, fwidth, _obj) {
    const texture = new THREE.TextureLoader().load(`./images/${_obj.img}`);
    let _repeat = false;
    if (_obj.repeatx != null && typeof _obj.repeatx !== 'undefined' && _obj.repeatx == true) {
      texture.wrapS = THREE.RepeatWrapping;
      _repeat = true;
    }
    if (_obj.repeaty != null && typeof _obj.repeaty !== 'undefined' && _obj.repeaty == true) {
      texture.wrapT = THREE.RepeatWrapping;
      _repeat = true;
    }
    if (_repeat) {
      texture.repeat.set(flength / _obj.RX, fwidth / _obj.RY);
    }
    return texture;
  };
  // 合并物体
  mergeModel(mergeOp, obj1, obj2, skin) {
    const fobjBSP = new ThreeBSP(obj1);
    const sobjBSP = new ThreeBSP(obj2);
    let resultBSP = null;
    if (mergeOp === '-') {
      resultBSP = fobjBSP.subtract(sobjBSP);
    } else if (mergeOp === '+') {
      resultBSP = fobjBSP.union(sobjBSP);
      return obj1;
    } else if (mergeOp === '&') {
      resultBSP = fobjBSP.intersect(sobjBSP);
    } else {
      resultBSP = fobjBSP;
    }
    let geometry = resultBSP.toMesh().geometry;
    //生成计算结果的几何体
    let result = new THREE.Mesh(
      geometry,
      this.commonFunc.setMaterials({
        color: skin.color || '#fff',
        map: skin.img ? new THREE.TextureLoader().load(`./images/${skin.img}`) : null,
        transparent: skin.transparent || false,
        opacity: skin.opacity || 1
      })
    );
    return result;
  }
  initScene() {
    this.scene = new THREE.Scene();
  }
  // 添加灯光
  initLight() {
    // var point = new THREE.PointLight(0xffffff, 1, 100, 2);
    // point.position.set(0, 600, 0); //点光源位置
    // // point.castShadow = true;
    // this.scene.add(point);
    // this.point = point;
    //  环境光
    var ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);

    // var light = new THREE.DirectionalLight(0xffffff, 0.8);
    // light.position.set(0, 500, 0);
    // light.castShadow = true;
    // this.scene.add(light);
  }
  // 添加太阳光
  initSun() {
    const textureLoader = new THREE.TextureLoader();

    // 用于模仿太阳光的图片图片,地址可以换成本地路径
    const textureFlare0 = textureLoader.load('./images/sun.png');
    const textureFlare3 = textureLoader.load('./images/sun1.png');
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, -100, -2000); // 将此平行光源调整到一个合适的位置
    directionalLight.castShadow = true; // 将此平行光源产生阴影的属性打开

    // const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,
    //   300); // 创建一个平行光源帮助器，帮助我们看到该光源的位置以及辐射范围
    // this.scene.add(directionalLightHelper); // 将此帮助器添加进场景

    // 设置平行光的的阴影属性，即一个长方体的长宽高，在设定值的范围内的物体才会产生阴影
    const d = 10000;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.near = 200;
    directionalLight.shadow.camera.far = 8000;

    directionalLight.shadow.mapSize.x = 1000; // 定义阴影贴图的宽度和高度,必须为2的整数此幂
    directionalLight.shadow.mapSize.y = 1000; // 较高的值会以计算时间为代价提供更好的阴影质量
    this.light = directionalLight;
    this.scene.add(directionalLight)

    const lensflare = new Lensflare(); // 实例化一个屏幕炫光对象
    // 加载屏幕炫光所用的图片，并且设置它的大小，距离光源的距离，和颜色。
    // 距离光源的距离的范围值为0到1之间，0为光源位置，1为屏幕位置。
    lensflare.addElement(new LensflareElement(textureFlare0, 200, 0, directionalLight.color));
    lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
    lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
    lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));

    directionalLight.add(lensflare); // 将屏幕炫光添加进平行光里，这样屏幕炫光的位置就是平行光源的位置，
  }
  // 获取当前时间的毫秒数
  getNowDateSecond() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let nows = hours * 60 * 60 + minutes * 60;
    let nowsecond = null;
    // 早上6点到晚上6点 为日出日落时间 其他没有太阳光
    // if (hours <= 6 || hours >= 18) {
    //   this.scene.remove(this.light)
    // } else {
    //   nowsecond = (hours * 60 * 60 + minutes * 60 + seconds) - (6 * 60 * 60)
    // }
    if (nows <= this.sunData.strSunRiseSecond || nows >= this.sunData.strSunSetSecond) {
      this.scene.remove(this.light)
    } else {
      nowsecond = (hours * 60 * 60 + minutes * 60 + seconds) - this.sunData.strSunRiseSecond
    }
    return nowsecond;
  }
  // 太阳光运动轨迹
  moveSun() {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -100, -2000),
      new THREE.Vector3(0, 3000, 1500),
      new THREE.Vector3(0, -100, 4000),
    ], false /*是否闭合*/ );

    const tubeGeometry = new THREE.TubeGeometry(curve, 100, 10, 50, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: false
    })
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);

    // this.scene.add(tube);
    // 86400 一天多少秒 43200
    const points = curve.getPoints(43200);

    // let i = 0;
    // const time =  setInterval(() => {
    //   this.light.position.set(points[i].x, points[i].y, points[i].z);

    //   i++;
    //   if (i > 3000 - 1) {
    //     i = 0
    //     clearInterval(time)
    //   }
    // }, 10);
    setInterval(() => {
      if (this.longitude) {
        const second = this.getNowDateSecond();
        if (second) {
          this.light.position.set(points[second].x, points[second].y, points[second].z)
          this.light.lookAt(this.scene.position)
        }
      }
    }, 1000);

  }
  initCamera() {
    //相机设置
    var k = this.width / this.height //窗口宽高比
    // var s = 1000; //三维场景显示范围控制系数 系数越大 显示越多
    // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    var camera = new THREE.PerspectiveCamera(45, k, 1, 1000000);
    camera.position.set(300, 1000, 8000);
    camera.lookAt(this.scene.position) //设置相机方向（指向场景对象）
    this.camera = camera;
    this.sceneObject.push(this.camera)

    // 监视器摄像头
    this.monitorCamera = new THREE.PerspectiveCamera(45, 1, 1, 10000)
    this.monitorCamera.position.set(-200, 460, 80);
    this.monitorCamera.lookAt(0, 500, 2000);
    var helper = new THREE.CameraHelper(this.monitorCamera);
    this.sceneObject.push(helper)
  }
  mouseCommon(event) {
    event.preventDefault();
    this.mouseClick.x = (event.offsetX / this.width) * 2 - 1;
    this.mouseClick.y = -(event.offsetY / this.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouseClick, this.camera);
    return this.raycaster.intersectObjects(this.sceneObject, true)
  }
  // 各类物体的点击事件
  documentMouseClick(event, type) {
    const intersects = this.mouseCommon(event)
    console.log(intersects)
    // intersects length 为 0 直接中断 函数
    if (!intersects.length) return;
    this.SELECTED = intersects[0].object;
    if (this.mouseEventList && this.mouseEventList[type] && this.mouseEventList[type].length > 0) {
      this.mouseEventList[type].map(item => {
        if (typeof item.obj_name === 'string') {
          item.obj_name === this.SELECTED.name && item.obj_event.call(this, this.SELECTED)
        } else if (item.findObject != null || typeof item.findObject === 'function') {
          item.findObject(this.SELECTED.name) && item.obj_event.call(this, this.SELECTED)
        }
      })
    }
  }
  initRender() {
    // 创建渲染对象
    let renderer = new THREE.WebGLRenderer()
    renderer.setSize(this.width, this.height);
    renderer.setClearColor('#225f93', 1);
    renderer.shadowMap.enabled = true; //开启阴影计算
    document.querySelector('#canvas').appendChild(renderer.domElement) //在特定的id下渲染
    this.renderer = renderer;
    this.renderer.domElement.addEventListener('click', throttle((e) => {
      this.documentMouseClick(e, 'click')
    }, 1000), false)
    this.renderer.domElement.addEventListener('mousemove', throttle((e) => {
      this.documentMouseClick(e, 'hover')
    }, 1000), false)


    // this.monitorRender = new THREE.WebGLRenderer({
    //   alpha: true,
    //   antialias:true,
    // })
    // this.monitorRender.setSize(300,200);
    // document.querySelector('#planform').appendChild(this.monitorRender.domElement)
    this.animation();
  }
  animation() {
    this.renderer.render(this.scene, this.camera);
    // this.monitorRender.render(this.scene,this.monitorCamera)
    this.stats && this.stats.update();
    requestAnimationFrame(this.animation.bind(this));
    this.points && this.pointsAnimation();
    this.turnMonitor();
  }
  // 转动监视器
  turnMonitor() {
    const camera = this.sceneObject.find(item => item.name === 'camera');
    if (camera) {
      const timer = Date.now() - this.startTime;
      camera.rotation.y = Math.sin(timer * 0.0005);
      this.monitorCamera.rotation.y = Math.sin(timer * 0.0005);
    }
  }
  // 控制器
  initContorls(params) {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    // this.controls1 = new THREE.OrbitControls(this.monitorCamera, this.monitorRender.domElement);
  }
  statsHelper() { //性能插件
    this.stats = new Stats();
    document.querySelector('#canvas').appendChild(this.stats.domElement);
  }
  // 设置粒子效果
  initPoints() {
    const particleCount = 2000;
    const geometry = new THREE.Geometry();
    const texture = new THREE.TextureLoader().load('http://stemkoski.github.io/Three.js/images/smokeparticle.png');
    // 点材质
    const material = new THREE.PointsMaterial({
      size: 20,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      color: 'rgb(30,30,30)'
    })
    // 也可以用点精灵材质
    // const material = new THREE.SpriteMaterial( { map: map } );
    // const sprite = new THREE.Sprite( material );
    const range = 10;
    for (let i = 0; i < particleCount; i++) {
      const x = THREE.Math.randInt(-range, range)
      const y = THREE.Math.randInt(-range, range)
      const z = THREE.Math.randInt(-range, range)
      const point = new THREE.Vector3(x, y, z);
      point.velocityX = THREE.Math.randFloat(0, 0.1) * Math.sign(x);
      point.velocityY = THREE.Math.randFloat(0.1, 0.3);
      point.velocityZ = THREE.Math.randFloat(-0.1, 0.1)
      geometry.vertices.push(point);
    }
    // 点
    this.points = new THREE.Points(geometry, material)
    this.points.position.set(100, 200, 100)
    this.scene.add(this.points)
  }
  //粒子效果动画
  pointsAnimation() {
    this.points.geometry.vertices.forEach(function (v) {
      v.y = v.y + v.velocityY;
      v.x = v.x + v.velocityX;
      v.z = v.z + v.velocityZ;
      if (v.y >= 100) {
        v.x = THREE.Math.randInt(-10, 10);
        v.z = 0;
        v.y = 0;
      }
    });

    this.points.geometry.verticesNeedUpdate = true;
  }
  initTrack() {
    var curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(200, 350, 2000),
      new THREE.Vector3(100, 350, 2000),
      new THREE.Vector3(-600, 350, 2000),
      new THREE.Vector3(-600, 350, 900),
      new THREE.Vector3(300, 350, 900),
    ], false /*是否闭合*/ );

    // 三维管道
    var tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.1, 50, false);
    var tubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: false
    })
    var tube = new THREE.Mesh(tubeGeometry, tubeMaterial);


    var points = curve.getPoints(3000);

    // var _material = new THREE.LineBasicMaterial({
    //   color: 0xff0000
    // });
    // var _geometry = new THREE.BufferGeometry();
    // var _pointsBuf = []
    // var _vertices = new Float32Array(_pointsBuf);
    // _geometry.addAttribute('position', new THREE.BufferAttribute(_vertices, 3));
    // var _lineA = new THREE.Line(_geometry, _material);
    // this.scene.add(_lineA);
    // this.scene.add(tube)
    let _i = 0;
    const time = setInterval(() => {
      // _pointsBuf.push(points[_i].x, points[_i].y, points[_i].z)
      // _vertices = new Float32Array(_pointsBuf)
      // _geometry.addAttribute('position', new THREE.BufferAttribute(_vertices, 3));

      this.camera.position.set(points[_i].x, points[_i].y, points[_i].z);
      this.camera.lookAt(points[_i + 1].x, points[_i + 1].y, points[_i + 1].z)
      _i++;
      if (_i > 3000 - 1) {
        _i = 0
        clearInterval(time)
      }
    }, 10);
  }
  // 会议室门
  //degflag 显示旋转往那边开 可正可负
  openDoor(obj, type, degflag = '+', diraction = 'z') {
    let doorstate = 'close';
    let tempobj = null;
    if (obj.doorstate) {
      doorstate = obj.doorstate
      tempobj = obj.parent;
    } else {
      const _objparent = obj.parent; // 这是scene对象
      tempobj = new THREE.Object3D(); //生成一个对象 中心轴为左侧门或者右侧门
      let objz = obj.geometry.parameters.width / 2;
      tempobj.position.set(
        diraction === 'x' ? obj.position.x + (type === 'left' ? -objz : objz) : obj.position.x,
        diraction === 'y' ? obj.position.y + (type === 'left' ? -objz : objz) : obj.position.y,
        diraction === 'z' ? obj.position.z + (type === 'left' ? -objz : objz) : obj.position.z,
      );
      obj.position.set(
        diraction === 'x' ? type === 'left' ? objz : -objz : 0,
        diraction === 'y' ? type === 'left' ? objz : -objz : 0,
        diraction === 'z' ? type === 'left' ? objz : -objz : 0);
      tempobj.add(obj);
      _objparent.add(tempobj);
    }

    obj.doorstate = doorstate === 'close' ? 'open' : 'close'
    const deg = 0.25 * 2 * (degflag === '-' ? -Math.PI : Math.PI)
    new createjs.Tween.get(tempobj.rotation)
      .to({
          y: doorstate == 'close' ? (type === 'left' ? -deg : deg) : 0 * 0.25 * Math.PI,
        },
        1000
      )
  }
  /*
   * 打开电动门
   * */
  opengateDoor(obj) {
    let doorstate = 'close';
    const left = this.commonFunc.findObject('gateDoorLeft');
    const right = this.commonFunc.findObject('gateDoorRight');
    if (left.doorstate && right.doorstate) {
      doorstate = left.doorstate || right.doorstate
    }
    left.doorstate = doorstate === 'close' ? 'open' : 'close'
    right.doorstate = doorstate === 'close' ? 'open' : 'close'
    new createjs.Tween.get(left.position).to({
      z: doorstate === 'close' ? left.position.z - 300 : left.position.z + 300
    }, 1000)
    new createjs.Tween.get(right.position).to({
      z: doorstate === 'close' ? right.position.z + 300 : right.position.z - 300
    }, 1000)
  }
  /*
   * 平移打开
   * obj 需要打开的对象
   * direction 方向 x y z
   * num 需要平移的值
   * */
  openDrawer(obj, direction = 'x', num = 80) {
    let drawer = 'close';
    if (obj.drawer) {
      drawer = obj.drawer;
    }
    obj.drawer = drawer === 'close' ? 'open' : 'close';
    const deg = drawer === 'close' ? obj.position[direction] + num : obj.position[direction] - num;
    new createjs.Tween.get(obj.position).to({
      x: direction === 'x' ? deg : obj.position.x,
      y: direction === 'y' ? deg : obj.position.y,
      z: direction === 'z' ? deg : obj.position.z,
    }, 500)
  }
}