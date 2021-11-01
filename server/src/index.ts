import * as http from 'http'

import { networkInterfaces } from 'os'

const handleRequest: (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => void = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next?: () => void,
): void => {
  const nets = networkInterfaces()
  const results = Object.create(null)

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = []
        }
        results[name].push(net.address)
      }
    }
  }

  res.writeHead(200)
  return res.end(JSON.stringify(results.eth0))
}

const server = http.createServer(handleRequest)

server.listen(4200)
