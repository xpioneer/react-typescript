import { PointLayer, Scene, PolygonLayer, LayerPopup } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import { GeographicStats, StatsData } from 'types/dashboard'

function hexToRgba(hex: string) {
  hex = hex.replace(/^#/, '').padStart(6, '0');

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (alpha = 1) => `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

let geoScene: Scene | null = null

export const setGeoOption = (list: GeographicStats[], colorPrimary: string) => {
  const setAlpha = hexToRgba(colorPrimary)
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


export const setGeoScene = (el: HTMLDivElement) => {
  return new Promise((resolve, reject) => {
    geoScene = new Scene({
      id: el,
      map: new GaodeMap({
        pitch: 0,
        style: 'dark',
        center: [120, 34],
        zoom: 3,
        token: '6f025e700cbacbb0bb866712d20bb35c',
      }),
      logoVisible: false
    });
    geoScene!.on('loaded', resolve);
  })
}