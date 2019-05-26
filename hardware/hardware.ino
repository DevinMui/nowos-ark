const int buttonPin = 8;
int startMillis;
int currentMillis;
int timer = 3000;
const int ledPin = 9;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  startMillis = millis();
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
