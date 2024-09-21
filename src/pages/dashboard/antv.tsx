import { PointLayer, Scene, LineLayer, LayerPopup, EarthLayer, IMapConfig } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { GeographicStats } from 'types/dashboard'
import { Earth } from '@antv/l7-maps';
import worldImg from '@/assets/imgs/world.jpg'

export type SetChartData = [AnyObject<string>[], GeographicStats[]]

const token = '6f025e700cbacbb0bb866712d20bb35c'

function hexToRgba(hex: string) {
  hex = hex.replace(/^#/, '').padStart(6, '0');

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (alpha = 1) => `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

let earthScene: Scene
let geoScene: Scene | null = null
let visitScene: Scene

const initScene = (el: HTMLDivElement, config: Partial<IMapConfig> = {
  pitch: 0,
  center: [120, 40],
  zoom: 3
}) => {
  return new Scene({
    id: el,
    map: new GaodeMap({
      ...config,
      style: 'dark',
      token,
    }),
    logoVisible: false,
  })
}

export const setGeoScene = (el: HTMLDivElement[]) => {
  return new Promise((resolve, reject) => {
    let count = 0
    const cb = () => {
      count++;
      if(count === el.length){
        resolve(1)
      }
    }
    visitScene = initScene(el[0], {pitch: 30, zoom: 2, center: [10, 40]});
    geoScene = initScene(el[1]);
    
    earthScene = new Scene({
      id: el[2],
      map: new Earth({
        style: 'dark'
      }),
      logoVisible: false,
    });
    earthScene.setBgColor("#333")
    // earthScene.setMapStyle('dark');
    
    visitScene.on('loaded', cb);
    geoScene.on('loaded', cb);
    earthScene.on('loaded', cb);
  })
}


const setGPSOption = (list: SetChartData[1], color: string) => {
  const setAlpha = hexToRgba(color)
  const values = list.map<number>(i => +i.total)
  const max = Math.max(...values)

  const data = list.map(i => {
    i.name_en = i.name_en || 'Unknow City'
    return i
  })

  const pointLayer = new PointLayer({})
    .source(data, {
      parser: {
        type: 'json',
        x: 'longitude',
        y: 'latitude',
      }
    })
    .shape('circle')
    .size('total', (t) => {
      if (t <= 10) {
        return 10
      } else if (4 < t && t <= 100) {
        return 20
      } else if (100 < t && t <= 200) {
        return 30
      } else {
        return 40
      }
    })
    // .shape('cylinder')
    // .size('total', function (level) {
    //   return [2, 2, level];
    // })
    .color('total', (c) => {
      return setAlpha(Math.ceil(+c/max * 16))
    })
    // .active(true)
    .style({
      opacity: 0.8,
      strokeWidth: 0,
    });

    const textLayer = new PointLayer({})
      .source(data, {
        parser: {
          type: 'json',
          x: 'longitude',
          y: 'latitude',
        }
      })
      .shape('total', 'text')
      .size(14)
      .color('total', '#000')
      .style({
        textAnchor: 'center', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
        textOffset: [0, -2], // 文本相对锚点的偏移量 [水平, 垂直]
        spacing: 2, // 字符间距
        padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
        stroke: '#ffffff', // 描边颜色
        strokeWidth: 0.5, // 描边宽度
      });

    const layerPopup2 = new LayerPopup({
      items: [
        {
          layer: pointLayer,
          fields: [
            {
              field: 'name_en',
              formatField: () => 'City',
            },
            {
              field: 'total',
              formatField: () => 'Visits',
            },
          ],
        },
      ],
      trigger: 'hover'
    })
  
  geoScene?.removeAllLayer(); // clear all
  geoScene?.addPopup(layerPopup2);
  geoScene?.addLayer(pointLayer);
  geoScene?.addLayer(textLayer);
}


const setVisitOption = (data: AnyObject<string>[], colorPrimary: string) => {
  const layer = new LineLayer({
    blend: 'normal',
  }).source(data, {
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
      x1: 'x1',
      y1: 'y1',
    },
  })
  .size(1)
  .shape('arc3d')
  .animate({
    enable: true,
    interval: 0.1,
    trailLength: 0.5,
    duration: 2,
  })
  .color(colorPrimary)
  .style({
    opacity: 0.8,
  });
  visitScene.removeAllLayer();
  visitScene.addLayer(layer);
}

const setEarthMap = (data: AnyObject<string>[], color: string) => {
  const earthlayer = new EarthLayer()
    .source(worldImg, {
      parser: {
        type: 'image',
      },
    })
    .color('#2E8AE6')
    .shape('base')
    .style({
      globalOptions: {
        ambientRatio: 0.6, // 环境光
        diffuseRatio: 0.4, // 漫反射
        specularRatio: 0.1, // 高光反射
      },
    })
    .animate(true);

    const atomLayer = new EarthLayer().color('#2E8AE6').shape('atomSphere').style({opacity: 1});

    const bloomLayer = new EarthLayer().color('#f00').shape('bloomSphere').style({
      opacity: 0.7,
    });

  const flyLine = new LineLayer({ blend: 'normal' })
    .source(data, {
      parser: {
        type: 'json',
        x: 'x',
        y: 'y',
        x1: 'x1',
        y1: 'y1',
      },
    })
    .color(color)
    .shape('arc3d')
    .size(0.2)
    .active(true)
    .animate({
      interval: 1,
      trailLength: 2,
      duration: 1,
    })
    .style({
      segmentNumber: 60,
      globalArcHeight: 10,
    });

  earthScene.removeAllLayer();
  earthScene.addLayer(earthlayer);
  earthScene.addLayer(atomLayer);
  earthScene.addLayer(bloomLayer);
  earthScene.addLayer(flyLine);

  // earthlayer.setEarthTime(4.0)
}

export const setGeoOptions = (data: SetChartData, color: string) => {
  setVisitOption(data[0], color)
  setGPSOption(data[1], color)
  setEarthMap(data[0], color)
}