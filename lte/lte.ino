#include "wio_tracker.h"

const int buttonPin = 20;
int startMillis;
int currentMillis;
int timer = 3000;

char message[256] = "A flood has been detected! Please evacuate quickly! Send STOP if you would like to stop receiving flood alerts.";
char number[12] = "number";

WioTracker wio = WioTracker();

void setup() {
  wio.Power_On();
  SerialUSB.println("Power On!");
  SerialUSB.println("Wait for network registered...");

  if(!wio.waitForNetworkRegister())
  {
    SerialUSB.println("Network error!");
    return;
  } else {
    SerialUSB.println("Network ready!");
  }

  pinMode(buttonPin, INPUT);
  startMillis = 0;

}

void loop() {
  currentMillis = millis();
  
  if(currentMillis - startMillis > timer){
    if(digitalRead(buttonPin)){
      startMillis = currentMillis;
      // if button is pressed, send message to number
      if(wio.sendSMS(number, message))
      {
        SerialUSB.println("Send OK!");
      }
      else
      {
        SerialUSB.println("Send Error!");
      }
    }
  }
}
