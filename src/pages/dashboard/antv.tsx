import { PointLayer, Scene, LineLayer, LayerPopup } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { GeographicStats } from 'types/dashboard'

const token = '6f025e700cbacbb0bb866712d20bb35c'

function hexToRgba(hex: string) {
  hex = hex.replace(/^#/, '').padStart(6, '0');

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (alpha = 1) => `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

let geoScene: Scene | null = null
let visitScene: Scene

const initScene = (el: HTMLDivElement) => {
  return new Scene({
    id: el,
    map: new GaodeMap({
      pitch: 0,
      style: 'dark',
      center: [120, 34],
      zoom: 3,
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
      if(count === 2){
        resolve(1)
      }
    }
    visitScene = initScene(el[0]);
    geoScene = initScene(el[1]);
    visitScene.on('loaded', cb);
    geoScene.on('loaded', cb);
  })
}


const setGPSOption = (list: GeographicStats[], color: string) => {
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

const setVisitOption = (data: GeographicStats[], colorPrimary: string) => {

  const dest = {
    "name_en": "Matawan",
    "ip": "45.77.218.105",
    "sub_name_en": "New Jersey",
    "total": "49",
    "latitude": "40.4169",
    "longitude": "-74.2579"
  }, list: any[] = [];

  data.forEach(i => {
    if(i.ip !== dest.ip) {
      list.push({
        from: i.name_en || 'Unknow',
        to: dest.name_en,
        value: i.total,
        type: 'move_out',
        x: i.longitude,
        y: i.latitude,
        x1: dest.longitude,
        y1: dest.latitude,
      })
    }
  })

  const layer = new LineLayer({
    blend: 'normal',
  }).source(list, {
    parser: {
      type: 'json',
      x: 'x',
      y: 'y',
      x1: 'x1',
      y1: 'y1',
    },
  })
  .size(1)
  .shape('greatcircle')
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

export const setGeoOptions = (data: GeographicStats[][], color: string) => {
  setVisitOption(data[0], color)
  setGPSOption(data[1], color)
}