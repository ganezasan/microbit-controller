import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

//chibi:bit BLE UUID
const UART_SERVICE = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const TX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

let bluetoothDevice;
let tXcharacteristic;

function App() {
  const [message, setMessage] = useState( '' );
  console.log(message)
  const sendMessage = () => {
    setMessage("");
    send(message);
  };

  return (
    <div className="App">
      <h1> Micro bit controller</h1>
      <input
        type="text"
        value={message}
        placeholder="Enter a message"
        onChange={e => setMessage(e.target.value)}
      />
      <br/>
      <br/>

      <button onClick={connect}>connect</button>
      <button onClick={disconnect}>disconnect</button>
      <button onClick={sendMessage}>sendMessage</button>
      <br/>
      <br/>
      <button onClick={() => send('straight')}>straight</button>
      <button onClick={() => send('right')}>right</button>
      <button onClick={() => send('left')}>left</button>
      <button onClick={() => send('back')}>Back</button>
    </div>
  );
}

function connect(e) {
  e.preventDefault();

  navigator.bluetooth.requestDevice({
    filters: [{
      namePrefix: 'BBC micro:bit',
    }],
    optionalServices: [UART_SERVICE]
  }).then(device => {
    bluetoothDevice = device;
    console.log("device", device);
    return device.gatt.connect();
  })
  .then(server => {
    console.log("server", server);
    return server.getPrimaryService(UART_SERVICE);
  })
  .then(service => {
    console.log("service", service);
    return service.getCharacteristic(TX_CHARACTERISTIC_UUID);
  })
  .then(chara => {
    console.log("chara", chara);
    alert("BLE接続が完了しました。");
    tXcharacteristic = chara;
    return chara;
  })
  .catch(error => {
    console.log(error);
  });
}

//BEL切断処理
function disconnect() {
  if (!bluetoothDevice || !bluetoothDevice.gatt.connected) return ;
  bluetoothDevice.gatt.disconnect();
  alert("BLE接続を切断しました。")
}

// Bluetoothで文字列を送信
function send(message) {
  if (!bluetoothDevice || !bluetoothDevice.gatt.connected) return ;
  console.log(tXcharacteristic);
  const encodedMessage = new Uint8Array(new TextEncoder().encode(`${message},`));
  console.log(encodedMessage);
  tXcharacteristic.writeValue(encodedMessage).then(r => console.log(r)).catch(e => console.log(e));
}

export default App;
