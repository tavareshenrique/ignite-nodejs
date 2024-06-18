import http from 'node:http';

import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const number = Number(chunk.toString())
    const result = number * -1

    callback(null, Buffer.from(`${result}\n`))
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  return res.end(fullStreamContent)

  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res)
})

server.listen(3334);