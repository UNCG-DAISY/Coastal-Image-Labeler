import _ from 'lodash'
import { log } from './logger'
//✔️
export async function compareTags(
  tag1: any,
  tag2: any,
  ignoreFields: string[]
) {
  //copy tags
  const t1 = _.cloneDeep(tag1)
  const t2 = _.cloneDeep(tag2)

  log({
    message: 'Comparing tags while ignoring:' + ignoreFields.toString(),
    type: 'info',
  })
  log({
    message: t1,
  })
  log({
    message: t2,
  })

  //delete ignore fields
  for (const field of ignoreFields) {
    delete t1[field]
    delete t2[field]
  }
  const isEqual = _.isEqual(t1, t2)

  log({
    message: `Compare tags result ${isEqual}`,
    type: 'info',
  })

  return isEqual
}
