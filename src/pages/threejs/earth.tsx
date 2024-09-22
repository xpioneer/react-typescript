import React, { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import worldImg from '@/assets/imgs/world.bd.jpg'
import moonImg from '@/assets/imgs/moon.jpg'
import { debounce } from '@/utils/debounce';

function setSence(el: HTMLDivElement) {
  const { clientWidth, clientHeight } = el
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(25, clientWidth / clientHeight, 0.1, 1000);
    camera.position.z = 30;
    // camera.updateProjectionMatrix(); // 更新投影矩阵

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(clientWidth, clientHeight);
    el.appendChild(renderer.domElement);

    // 创建球体几何体
    const earthGeometry = new THREE.SphereGeometry(2, 120, 120); // 半径为2，120个纬线和120个经线

    // 加载图片纹理
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load(worldImg); // 加载图片
    earthMap.wrapS = earthMap.wrapT = THREE.RepeatWrapping; // 设置纹理包裹方式
    earthMap.anisotropy = renderer.capabilities.getMaxAnisotropy(); // 设置各向异性过滤

    // 创建材料
    const earthMaterial = new THREE.MeshBasicMaterial({ map: earthMap });
    // 创建网格
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    // 将地图添加到场景
    // scene.add(earth);

    // 创建月亮几何体和材质
    const moonGeometry = new THREE.SphereGeometry(0.5, 128, 128); // 比地球小的月亮
    const moonTexture = textureLoader.load(moonImg);
    const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);

    // 创建一个 Group 将地球和月亮添加到一起
    const earthGroup = new THREE.Group();
    earthGroup.add(earth); // 将地球放在中心位置
    // 设置月亮初始位置相对于地球偏移
    moon.position.set(10, 0, 0); // 让月亮在地球右侧（x轴方向）距离10个单位
    earthGroup.add(moon); // 将月亮添加到 Group 中

    // 将地球和月亮的 Group 添加到场景
    scene.add(earthGroup);

    // 添加光源
    const light = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.minAzimuthAngle = -Math.PI / 4; // 最小水平旋转角度，限制在 -45°
    // controls.maxAzimuthAngle = Math.PI / 4;  // 最大水平旋转角度，限制在 45°

    // 渲染循环
    function renderScene() {
      requestAnimationFrame(renderScene);
      
      // 地球旋转，每帧旋转一个小角度
      earth.rotation.y += 0.003; // 调整这个值来控制旋转速度
      // 让月亮围绕地球旋转（绕 Y 轴）
      earthGroup.rotation.y += 0.003; // 旋转 Group，让月亮围绕地球旋转

      // 动态调整相机的位置或角度
      // const distance = 15; // 调整到合适的距离
      // const angle = Date.now() * 0.001; // 旋转角度
      // camera.position.x = distance * Math.sin(angle);
      // camera.position.z = distance * Math.cos(angle);
      // camera.lookAt(earth.position); // 相机始终朝向地球

      controls.update();
      renderer.render(scene, camera);
    }
    renderScene();

    return {
      camera,
      renderer,
      renderScene,
      cleanup: () => {
        controls.dispose();
        renderer.dispose();
        el.removeChild(renderer.domElement);
      }
    };
}

const emptyFn = () => {}

export const EarthMap: React.FC = () => {

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
      let sence: any = {
        camera: new THREE.PerspectiveCamera,
        renderer: new THREE.WebGLRenderer,
        renderScene: emptyFn,
        cleanup: emptyFn
      }

      requestIdleCallback(() => {
        // const { clientWidth, clientHeight } = divRef.current!
        // console.log('requestIdleCallback:', Date.now(), { clientWidth, clientHeight })
        sence = setSence(divRef.current!)
      })
      // requestAnimationFrame(() => {
      //   const { clientWidth, clientHeight } = divRef.current!
      //   console.log('requestAnimationFrame:', Date.now(), { clientWidth, clientHeight })
      // })
      // Promise.resolve().then().finally(() => {
      //   const { clientWidth, clientHeight } = divRef.current!
      //   console.log('Promise:', Date.now(), { clientWidth, clientHeight })
      // })
      // window.setTimeout(() => {
      //   const { clientWidth, clientHeight } = divRef.current!
      //   console.log('setTimeout:', Date.now(), { clientWidth, clientHeight })
      // }, 0)
      
      const handleResize = debounce(() => {
        if (divRef.current) {
          const { clientWidth, clientHeight } = divRef.current;
          sence.camera.aspect = clientWidth / clientHeight;
          sence.camera.updateProjectionMatrix();
          sence.renderer.setSize(clientWidth, clientHeight);
          sence.renderScene();
        }
      }, 500);

      // window.addEventListener('resize', handleResize);
    
      return () => {
        sence.cleanup();
        window.removeEventListener('resize', handleResize);
      };
  });

  // useLayoutEffect(() => {
  //   const { clientWidth, clientHeight } = divRef.current!
  //   console.log('useLayoutEffect:', Date.now(), { clientWidth, clientHeight })
  // })


  return <div ref={divRef} style={{height: 700}}></div>
}