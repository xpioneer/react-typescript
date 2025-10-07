import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd'
import { ErrorLog } from 'types/apiError'
import styles from './style.module.scss'
import { JSONView } from '@components/jsonView'

interface IProps {
  data?: ErrorLog
  onClose?: () => void
}

export const LogDetailDrawer: React.FC<IProps> = ({
  data: {
    id,
    ip,
    msg,
    errors,
    url,
    path,
    params,
    headers,
    resHeaders,
    resData,
    createdAt,
    status,
    time,
  } = {},
  onClose = () => {}
}) => {

  const [open, setOpen] = useState(false)

  const _onClose = () => {
    setOpen(false)
    onClose()
  }

  useEffect(() => {
    console.log('data: ', id)
    if(id) {
      setOpen(true)
    }
  }, [id])

  return <Drawer
    title="Error log details"
    open={open}
    mask={false}
    width='70%'
    onClose={_onClose}
    className={styles.large}
  >
    <div className="row">
      <div>ID：</div><div>{id}</div>
    </div>
    <div className="row">
      <div>IP：</div><div>{ip}</div>
    </div>
    <div className="row">
      <div>错误信息：</div><div>{msg}</div>
    </div>
    <div className="row">
      <div>堆栈信息：</div>
      <div>
        <JSONView data={errors!} />
      </div>
    </div>
    <div className="row">
      <div>Url：</div><div>{url}</div>
    </div>
    <div className="row">
      <div>Path：</div><div>{path}</div>
    </div>
    <div className="row">
      <div>参数：</div>
      <div>
        <JSONView data={params} />
      </div>
    </div>
    <div className="row">
      <div>请求头：</div>
      <div>
        <JSONView data={headers} />
      </div>
    </div>
    <div className="row">
      <div>响应头：</div>
      <div>
        <JSONView data={resHeaders} />
      </div>
    </div>
    <div className="row">
      <div>响应参数：</div>
      <JSONView data={resData}/>
    </div>
    <div className="row">
      <div>创建时间：</div><div>{createdAt}</div>
    </div>
    <div className="row">
      <div>状态：</div><div>{status}</div>
    </div>
    <div className="row">
      <div>耗时：</div><div>{time}ms</div>
    </div>
  </Drawer>
}