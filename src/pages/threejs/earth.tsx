import React, { useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import worldImg from '@/assets/imgs/world.bd.jpg'
import { debounce } from '@/utils/debounce';

function setSence(el: HTMLDivElement) {
  const { clientWidth, clientHeight } = el
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(clientWidth, clientHeight);
    el.appendChild(renderer.domElement);

    // 创建球体几何体
    const geometry = new THREE.SphereGeometry(2, 120, 120); // 半径为2，120个纬线和120个经线

    // 加载图片纹理
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load(worldImg); // 加载图片
    map.wrapS = map.wrapT = THREE.RepeatWrapping; // 设置纹理包裹方式
    map.anisotropy = renderer.capabilities.getMaxAnisotropy(); // 设置各向异性过滤

    // 创建材料
    const material = new THREE.MeshBasicMaterial({ map: map });
    // 创建网格
    const plane = new THREE.Mesh(geometry, material);
    // 将地图添加到场景
    scene.add(plane);

    // 添加光源
    const light = new THREE.AmbientLight(0xffffff, 0.5); // 环境光
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    // 渲染循环
    function renderScene() {
      requestAnimationFrame(renderScene);
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