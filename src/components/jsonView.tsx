import React, {} from 'react'
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

interface IProps {
  data: Object | any[]
}

export const JSONView: React.FC<IProps> = ({
  data
}) => {
  return <JsonView
    data={data}
    shouldExpandNode={allExpanded}
    style={defaultStyles}
  />
}