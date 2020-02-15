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

    }
  })

  return server
}