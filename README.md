# Micorbit-controller

It's a controller of microbit on the web browser. This tool connects to a microbit by BLE(bluetooth).
Thie web app created from `create-react-app`.

## install and run App

```
$ yarn install
$ yarn start
```

## how to use it

This tool can send a string message to the microbit through BLE.
Before you send a message, you need to connect the microbit.

These are the function list.

- connect
- disconnect
- sendMessage

And an example code of microbit, if you send some particular messages below, it moves as follow that message.
If you send other words, microbit displays those words one by one character.

- straight
- right
- left
- back

## microbit code

I uses this Ring:Bit car, the quority isn't great but it works.
> https://www.amazon.co.jp/dp/B07GQZHQXK/ref=cm_sw_em_r_mt_dp_U_yz3vDbKMZR09G

here is my microbit code
> https://makecode.microbit.org/_gw2L0tLATiMW
