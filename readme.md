# nowo's ark

Upvote us on [Hackster.io](https://www.hackster.io/nowo/nowos-ark-774dd8)!

[Demo](https://studio.youtube.com/video/ym6YZvN1P3U/edit)

### Set Up

Follow the instructions on the Hackster page to set up the wiring properly.

`secrets.js` file template

```js
module.exports = {
	accountId: 'A******************',
	authToken: '*******************',
	number: '+twilio_number_here'
}
```

### How to

1. Install node modules for the server

`cd server && npm install`

2. Run the server

`node app.js`

3. Upload `hardware.ino` to Arduino

4. Establish a serial connection between Arduino and the Linux board

`python controller.py`

### License

```
The MIT License

Copyright (c) 2019 nowo's ark

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```