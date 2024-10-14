import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import * as FaceApi from '@vladmandic/face-api'
import { Button, Flex, Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/lib/upload'
import { message } from '@/components/message'

const FacePage: React.FC = () => {
  const loaded = useRef(false)
  const inputImg = useRef<HTMLImageElement>(null)
  const ouputRef = useRef<HTMLDivElement>(null)

  const onLoadModels = () => {
    Promise.all([
      FaceApi.nets.ssdMobilenetv1.loadFromUri('/model'),
      FaceApi.nets.faceLandmark68Net.loadFromUri('/model'),
      FaceApi.nets.faceRecognitionNet.loadFromUri('/model'),
    ]).then(r => {
      loaded.current = true
      // load models done
    })
  }

  const detectFaceInImage = async (input: HTMLImageElement) => {
    return await FaceApi.detectAllFaces(input)
        .withFaceLandmarks()
        .withFaceDescriptors()
  }

  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const file = info.file.originFileObj
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        inputImg.current!.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  const onDetect = async () => {
    if(loaded.current) {
      const image = inputImg.current!;
      const container = ouputRef.current!;
      const detections = await detectFaceInImage(image);

      // console.log(detections, "detections")
      if(detections.length) {
        message.success('Successfully recognized the face!')
        const dpr = window.devicePixelRatio || 1;
        const createdCanvas = FaceApi.createCanvasFromMedia(image);
        createdCanvas.width = image.naturalWidth * dpr;
        createdCanvas.height = image.naturalHeight * dpr;
        createdCanvas.style.width = `${image.naturalWidth}px`;
        createdCanvas.style.height = `${image.naturalHeight}px`;
        container.replaceChildren();
        container.appendChild(createdCanvas);
        FaceApi.draw.drawDetections(createdCanvas, detections!);
        FaceApi.draw.drawFaceLandmarks(createdCanvas, detections!);
      } else {
        message.warning('Face not recognized!')
      }
    } else {
      message.warning('Wait models loading...')
    }
  }

  const customRequest = () => {
    return true;
  }

  useEffect(() => {
    // load FaceApi models
    onLoadModels()
  }, [])

  return <Flex vertical className={styles.face}>
    <h2>Face Recognition</h2>
    <Flex align='center' justify='space-between' className={styles.wrap}>
      <div>
        <Upload
          listType='text'
          showUploadList={false}
          onChange={onChange}
          customRequest={customRequest}
        >
          Choose your face pictrue
        </Upload>
        <img ref={inputImg}/>
      </div>
      <Button onClick={onDetect}>Detect</Button>
      <div className={styles.result} ref={ouputRef}>
      </div>
    </Flex>
  </Flex>
}

export default FacePage
