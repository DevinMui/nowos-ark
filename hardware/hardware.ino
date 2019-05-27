const int buttonPin = 8;
int startMillis;
int currentMillis;
int timer = 3000;
const int ledPin = 9;

void setup() {
  Serial.begin(9600);
  Serial.println("serial started");
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  startMillis = 0;
}

void loop() {
    currentMillis = millis();
    
    if(currentMillis - startMillis > timer){
      if(digitalRead(buttonPin)){
        Serial.println("on");
        startMillis = currentMillis;
        digitalWrite(ledPin, HIGH);
      } else {
        digitalWrite(ledPin, LOW);
      }
    }
}
