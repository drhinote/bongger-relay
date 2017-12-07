var PeerGroup = require('bitcoin-net').PeerGroup;
var Inventory = require('bitcoin-inventory');
var express = require('express');
var bodyParser = require('body-parser');
var messages = require('./messages');
var bitcoin = require('bitcoinjs-lib');
var reverse = require('buffer-reverse');

var app = express();
var port = process.env.PORT || 80;

app.use(bodyParser.json({ strict: false }));

var peers = new PeerGroup({
    dnsSeeds: ["dnsseed01.bongger.com", "dnsseed02.bongger.com", "dnsseed03.bongger.com", "dnsseed04.bongger.com"],
    magic: 0xc0c0c0c0,
    defaultPort: 7071,
    messages: messages.defaultMessages,
}, {
        numPeers: 8,
        acceptIncoming: true,
        peerOpts: {
            requireBloom: true,
            userAgent: "/theGreensCard:1.0.1.0/",
            relay: false
        }
    });

peers.connect();

peers.on('peer', peer => {
    console.log('Connected to peer');
});

peers.on('error', error => {
    console.log(JSON.stringify(error));
});

var inv = Inventory(peers);

function getHash(tx) {
    return reverse(tx.getHash()).toString('hex');
}

app.route('/tx').post(async (req, res) => {
    try {
        console.log(new Date().toLocaleString() + ', Relaying tx: ' + req.body.tx);
        var tx = bitcoin.Transaction.fromHex(req.body.tx);
        inv.broadcast(tx);
        res.status(200).send(JSON.stringify({ txid: getHash(tx) }));
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify(e));
    }
});

app.listen(port);

console.log(new Date().toLocaleTimeString() + ' Server started on: ' + port);
