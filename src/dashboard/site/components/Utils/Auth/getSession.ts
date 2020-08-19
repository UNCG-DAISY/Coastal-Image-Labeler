import { IncomingMessage } from 'http'

interface IncomingMessageSession extends IncomingMessage {
  session?: any
}

export default function getSession(request: IncomingMessage): object {
  const req: IncomingMessageSession = request
  let user = {}

  if (req.session && req.session.passport) {
    user = req.session.passport.user ?? {}
  }

  return user
}
