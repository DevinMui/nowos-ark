import requests
import serial
import traceback

from time import sleep

# establish serial connection with arduino
ser = serial.Serial('/dev/cu.usbmodem141401', 9600)
url = "http://localhost:3000/data"

while True:
	try:
		line = ser.readline()
		if 'on' in line:
			print('flood detected!')
			r = requests.post(url, data={'status': True })
			sleep(3)

	except:
		traceback.print_exc()