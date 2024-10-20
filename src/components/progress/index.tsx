import { useAppStore } from '@/stores'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './style.module.scss'

interface ProgressProps {
  size?: 'small' | 'default' | 'large'
}

export const ProgressComponent: React.FC<Required<ProgressProps>> = ({
  size
}) => {

  const [{
    colorPrimary,
  }] = useAppStore()

  const el = useRef<HTMLDivElement>(null)
  const sizes: Record<Exclude<ProgressProps['size'], undefined>, number> = {
    small: 2,
    default: 3,
    large: 4,
  }

  useLayoutEffect(() => {
    const TOTAL = 100
    let progress = 0, timer = 0
    let total = TOTAL // percent 100%
    const div = el.current!

    function animate(time: number) {
      const used = total * 0.1
      total -= used
      progress += used

      // update progress
      if (progress < TOTAL * 0.9999) {
        div.style.width = `${progress}%`
        timer = requestAnimationFrame(animate)
      } else {
        div.style.width = '100%'
        cancelAnimationFrame(timer)
      }
    }

    timer = requestAnimationFrame(animate)
    return () => {
      div.style.width = '100%'
      cancelAnimationFrame(timer)
    };
  }, []);

  return <div
    ref={el}
    className={styles.progress}
    style={{
      boxShadow: `0 0 4px 1px ${colorPrimary}99`,
      height: `${sizes[size]}px`,
      background: colorPrimary,
    }}
  />
}

export const Progress: React.FC<ProgressProps> = ({
  size = 'default'
}) => {

  const node = useRef(document.createElement('div'))

  useLayoutEffect(() => {
    const el = node.current
    document.body.append(el)
    return () => {
      document.body.removeChild(el)
    }
  }, [])



  return createPortal(
    <ProgressComponent size={size} />,
    node.current
  )
}