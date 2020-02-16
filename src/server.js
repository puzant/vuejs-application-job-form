import { Server, Model } from 'miragejs'

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,
  
    routes() {
      this.namespace = "api"
  
      this.get('/test-route', () => {
        return {
          movies: [
            { id: 1, name: "Inception", year: 2010 },
            { id: 2, name: "Interstellar", year: 2014 },
            { id: 3, name: "Dunkirk", year: 2017 },
          ],
        }
      })

      //  mock route to post the job form data 
      this.post('/submit-application', (req, res) => {
        return 'application recivied'
      })
      
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