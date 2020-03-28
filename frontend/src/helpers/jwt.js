import jwt from 'jsonwebtoken'
import { DateTime } from 'luxon'

export function isExpired(token) {
  const { exp } = jwt.decode(token)
  const tenMinBeforeExp = DateTime.fromMillis(exp * 1000)
    .minus(10, 'minutes')

  return tenMinBeforeExp.diffNow('seconds').seconds < 0
}

