import { Server, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,
  
    routes() {
      this.namespace = "api"
      
      this.post('/submit-application', (schema, request) => {
        let application = JSON.parse(request.requestBody)
        return new Response (
          200, {some: 'header'}, {msg: 'application recived successfully'}
        )
      }, {timing: 4000} )

    }
  })

  return server
}