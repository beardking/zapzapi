const QRCode = require('qrcode')
const express  = require('express')
const { Client } = require('whatsapp-web.js');
const client = new Client()
const { EventEmitter } = require('events')
const { inherits } = require('util')
const app = express()
var qr_code




client.on('qr', (qr) => {
				console.log('qr_received');
				qr_code = qr;
				app.get("/qr", testQRCode);
    });


app.get("/", (req, res) => {

	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end("<!DOCTYPE html/><html><head><title>ZapiZap</title></head><body><h1>Loading</h1></body></html>")
})


function testQRCode (req, res) {


	console.log("req");

  // QRCode.QRCodeDraw.color.dark = '#d4d4d4';
  QRCode.toDataURL(qr_code, function (err, url) {
    if (err) console.log('error: ' + err)
    res.send("<img src='" + url + "'/>" )
  })
}

app.listen(8080, () => {client.initialize();console.log('server on')});
