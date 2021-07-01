import * as functions from 'firebase-functions'
import * as corsModule from 'cors'
import * as admin from 'firebase-admin'

const cors = corsModule({origin: true})

exports.image = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        
    })
})