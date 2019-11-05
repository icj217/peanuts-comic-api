import axios from 'axios'

const sharedKey = process.env.RECAPTCHA_SHARED_KEY

const recaptchaAPI = axios.create({ baseURL: 'https://www.google.com/recaptcha/api', params: { secret: sharedKey } })

const isValid = async (token) => {
  const res = await recaptchaAPI.post('/siteverify', { response: token })
  return res.data.success
}

export default { isValid }
