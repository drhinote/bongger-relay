# bongger-relay


Transaction relay for the Bongger (BGR) network



## Requires



Node >= 8.9.1



## Usage



### Start-up
On command line:

$ npm install bongger-relay



$ echo require('bongger-relay') > index.js

$ node index.js


### Sending a transaction

POST an http request to the host, i.e.: http://localhost:420/

Post Body should contain a JSON object with a property named "tx" having a value of the serialized hex form of the transaction to broadcast: { "tx": "5875fbd7fb96cd71522bffc54f5983211a9d5969eb51f32674b5d5c76757d4fe010000000000000000000000000000000000000000000000000000000000000000000000696ad20e2dd4365c7459b4a4a5af743d5e92c6da3229e6532cd605f6533f2a5b24a6a152f0ff0f1e67860100" }

## Donations

Bitcoin 13nyq5Ukxw4H1NrRWKG5fXyDGg7zEpogzq

Bongger AxDHQYnD7eJWqMmU8YEEJ92PbxELTquyMH