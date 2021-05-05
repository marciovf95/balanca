require('events').EventEmitter.defaultMaxListeners = 0;
const express = require('express');
const { parse } = require('path');
const app = express();
const portaservidor = 6969;
var jsonData = require('./balanca.json');
var porta = jsonData.Balanca[0].Porta
const SerialPort = require('serialport')
const port = SerialPort(porta,{ autoOpen: true});
const Readline = SerialPort.parsers.Readline
const parser = new Readline()
port.pipe(parser) 
app.get('/', (req, res) => { 
    port.flush()   
    var peso = parser.buffer.toString();    
    if(!peso.substring((peso.length)-9,peso.length)){
        res.send("=ERROBalanca não encontrada");
    } else{
        res.send("="+peso.substring((peso.length)-9,peso.length));
    }    
})
app.listen(portaservidor, () => {
    console.log(`Ta Escutando na Porta http://localhost:${portaservidor}`)
})