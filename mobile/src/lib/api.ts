
import axios from 'axios'

export const api = axios.create({
  // Authorization callback URL, verificar o próprio ip
  baseURL: 'http://192.168.0.8:3333',
})