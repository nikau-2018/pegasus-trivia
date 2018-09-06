import request from 'superagent'

const rootUrl = '/api/V1'

export function getFruits () {
  return request.get(rootUrl + '/fruits')
    .then(res => {
      return res.body.fruits
    })
}
