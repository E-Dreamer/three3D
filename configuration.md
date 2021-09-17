##data 基本的结构
```
{
  uuid:'',
  name:'', //物体的名称
  width, //x轴方向的长度
  height, //y轴方向的长度
  depth // z轴方向的长度
  x, //x轴位置
  y, //y轴位置
  z, // z轴位置
  <!-- 正方体 | 平面 | 圆柱/三角柱 | 可开门的正方体 | 组() | 需要计算的 -->
  type: 'cube | plane | cylinder | cabinet |  group | merge'
  parent:{} // type 为 merge 必须
  mergeChild:[] // type 为 merge 必须
  skin:{
    color:'' //表示的整体颜色
    opacity:'' //整体透明度
    transparent: '' //整体是否完全透明
    skinUp:{
      img:'' ,//该面的贴图
      repeatx: true, //贴图是否重复开启
      repeaty: true,
      RX: 128, //按照多大块重复贴
      RY: 128
      frontimg:'' // type为cabint 可以设置每个面 前后左右上下面的图片 
    }, //y轴向外的面 格外设置
    skinBottom:{}, //y轴靠 0 的面 格外设置
    skinBack:{}, // x轴向外的面 格外设置
    skinFront:{},// x轴靠0的面 格外设置
    skinLeft:{}, // z轴靠0 的面 格外设置
    skinRight:{} //z轴 向外的面 格外设置
  }
}
```

<!-- 淘汰的代码 -->
```
  // 生成正方体
  initCube(obj) {
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
    // 给每个面设置不同的颜色
    // for (let i = 0; i < geometry.faces.length; i += 2) {
    //   const hex = obj.skin.color || Math.random() * 0x531844;
    //   geometry.faces[i].color.setHex(hex);
    //   geometry.faces[i + 1].color.setHex(hex);
    // }
    const mesh = new THREE.MeshBasicMaterial({
      color: skin.color || 0x98750f,
      map: skin.img ? this.createSkin(width, height, obj.skin) : null,
      opacity: obj.opacity || 1,
    })
    obj.opacity && (mesh.transparent = true);
    let flag = false;
    for (let k in skin) {
      if (k.includes('skin')) {
        flag = true
      }
    }
    // 顺序 x前后 y前后 z前后   (front back x方向  left right 为z方向 up bottom 为y轴方向)
    const materials = [
      skin.skinBack ? new THREE.MeshBasicMaterial({
        map: this.createSkin(width, height, obj.skin.skinBack),
        transparent: !!skin.opacity || false
      }) : mesh,
      skin.skinFront ? new THREE.MeshBasicMaterial({
        map: this.createSkin(width, height, obj.skin.skinFront),
        transparent: !!skin.opacity || false
      }) : mesh,
      skin.skinUp ? new THREE.MeshBasicMaterial({
        map: this.createSkin(width, height, obj.skin.skinUp),
        transparent: !!skin.opacity || false
      }) : mesh,
      skin.skinBottom ? new THREE.MeshBasicMaterial({
        map: this.createSkin(width, height, obj.skin.skinBottom),
        transparent: !!skin.opacity || false
      }) : mesh,
      skin.skinRight ? new THREE.MeshBasicMaterial({
        map: this.createSkin(width, height, obj.skin.skinRight),
        transparent: !!skin.opacity || false
      }) : mesh,
      skin.skinLeft ? new THREE.MeshBasicMaterial({
        map: this.createSkin(width, height, obj.skin.skinLeft),
        transparent: !!skin.opacity || false
      }) : mesh
    ];
    let otherMesh = new THREE.MeshFaceMaterial(materials)
    var cube = new THREE.Mesh(geometry, flag ? otherMesh : mesh);
    cube.position.set(x, y, z)
    rotate && this.commonFunc.setRotate(cube, rotate);
    cube.castShadow = true; // 判断物体是否在关照下产生投影
    cube.receiveShadow = true; // 是否接受其他模型的投影效果
    cube.uuid = obj.uuid; // 给物体添加一个id
    cube.name = obj.name; // 给物体添加一个name
    return cube;
  }
```
```
// 生成一个有空的正方体
  initOther() {

    let wall = new THREE.Mesh(
      new THREE.BoxGeometry(500, 300, 10),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00
      })
    );

    wall.position.x = 0;
    wall.position.y = 0;
    wall.position.z = 0;

    let window1 = new THREE.Mesh(
      new THREE.BoxGeometry(350, 150, 10),
      new THREE.MeshBasicMaterial({
        color: 0xff0000
      })
    );

    window1.position.x = 0;
    window1.position.y = 0;
    window1.position.z = 0;

    let bsp_wall = new ThreeBSP(wall);
    let bsp_window1 = new ThreeBSP(window1);
    //开始计算从bsp_wall减去bsp_window1后的BSP对象
    let BSP = bsp_wall.subtract(bsp_window1);
    //获取结算结果中的geometry对象
    let geometry = BSP.toMesh().geometry;
    //生成计算结果的几何体
    let res = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: '#fff'
      })
    );
    //将几何体添加到场景中
    this.scene.add(res);
  }
```