import { createServer } from "miragejs"
import comicCatalog from '../../tests/fixtures/comicCatalog.json'
const baseURL = 'http://gateway.marvel.com'
export default function () {
    createServer({
        routes() {
          this.get(`${baseURL}/v1/public/comics`, () => ({
            ...comicCatalog
          }))
        },
      })
}