import * as http from 'http'

const handleRequest: (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => void = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  next?: () => void,
): void => {
  res.writeHead(200)
  return res.end(null)
}

const server = http.createServer(handleRequest)

server.listen(4200)
