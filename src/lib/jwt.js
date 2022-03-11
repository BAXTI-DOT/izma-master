import { verify as verification, sign as signed } from 'jsonwebtoken'

import { JWT } from '@config'

export const sign = (payload, expiresIn = JWT.EXPIRES_IN) => signed(payload, JWT.SECRET)
export const verify = accessToken => verification(accessToken, JWT.SECRET)