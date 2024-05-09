import http from 'node:http';

import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString())
    const result = number * -1

    console.log(result)

    callback(null, Buffer.from(`${result}\n`))
  }
}

const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumberStream())
    .pipe(res)
})

server.listen(3334);