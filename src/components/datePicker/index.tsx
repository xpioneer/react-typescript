// import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns'
import generatePicker from 'antd/es/date-picker/generatePicker'
import 'antd/es/date-picker/style/index'
import dateFnsGenerateConfig from '../../../node_modules/.pnpm/rc-picker@3.14.6_date-fns@2.30.0_dayjs@1.11.10_react-dom@18.2.0_react@18.2.0/node_modules/rc-picker/lib/generate/dateFns' // pnpm issue

export const DatePicker = generatePicker<Date>(dateFnsGenerateConfig)
