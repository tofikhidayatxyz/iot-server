#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define ARRAY_SIZE(x) sizeof(x)/sizeof(x[0])

char ssid[] = "";
char pass[] = "";  
char host[] = "http://13.250.47.156:3030/api";


/// relay pin 1
const char*   relay_1  =  "relay_1";
int pin_1  =  0;
/// relay pin 2
const char*  relay_2  =  "relay_2";
int  pin_2  =  15;
/// relay pin 3
const char*  relay_3  =  "relay_3";
int  pin_3  =  16;
/// relay pin 4
const char*  relay_4  =  "relay_4";
int pin_4  =  5;
/// relay pin 5
const char*  relay_5  = "relay_5";
int  pin_5  =  4;
/// relay pin 6
const char*  relay_6  =  "relay_6";
int pin_6  =  14;
/// relay pin 7
const char*  relay_7  =  "relay_7";
int pin_7  =  12;
/// relay pin 8
const char* relay_8 = "relay_8";
int pin_8  =  13;


void setup() {  

  pinMode(3, OUTPUT);
  pinMode(pin_1, OUTPUT);
  pinMode(pin_2, OUTPUT);
  pinMode(pin_3, OUTPUT);
  pinMode(pin_4, OUTPUT);
  pinMode(pin_5, OUTPUT);
  pinMode(pin_6, OUTPUT);
  pinMode(pin_7, OUTPUT);
  pinMode(pin_8, OUTPUT);

  
  Serial.begin(115200);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Wi-Fi connected successfully");
}



// the loo function runs over and over again forever
void loop() {
  HTTPClient http;  //Declare an object of class HTTPClient
  http.begin(host); /// set this to your http server
  int httpCode = http.GET();
  if (httpCode > 0) {
    //Serial.print(http.getString());//get string
    DynamicJsonBuffer jsonBuffer; 
    JsonArray& root = jsonBuffer.parseArray(http.getString());
    if (!root.success()) {
      Serial.println("parseObject failed");
      return;
    } else {
      for (int i = 0; i < sizeof(root) ; i++) {
        String access   =  root[i]["access"];
        String status   =  root[i]["status" ];
        getProcess(access,status);
      }
    }
  }
  //digitalWrite(3, HIGH);
  //delay(50);
  //digitalWrite(3, LOW);
  delay(200);
}


/*
 * Sementara  parameter on off dibalik
 */

void getProcess(String access , String status ) {
   if(access == relay_1) {
     if(status == "off") {
        digitalWrite(pin_1,HIGH);
        Serial.println("Pin 1 Off");
     } else {
        digitalWrite(pin_1,LOW);
        Serial.println("Pin 1 On");
     }
   } else if(access == relay_2) {
     if(status == "off") {
        digitalWrite(pin_2,HIGH);
        Serial.println("Pin 2 Off");
     } else {
        digitalWrite(pin_2,LOW);
        Serial.println("Pin 2 On");
     }
   } else if(access == relay_3) {

     if(status == "off") {
        digitalWrite(pin_3,HIGH);
        Serial.println("Pin 3 Off");
     } else {
        digitalWrite(pin_3,LOW);
        Serial.println("Pin 3 On");
     }
   } else if(access == relay_4) {
     if(status == "off") {
        digitalWrite(pin_4,HIGH);
        Serial.println("Pin 4 Off");
     } else {
        digitalWrite(pin_4,LOW);
        Serial.println("Pin 4 On");
     }
   } else if(access == relay_5) {
     if(status == "off") {
        digitalWrite(pin_5,HIGH);
        Serial.println("Pin 5 Off");
     } else {
        digitalWrite(pin_5,LOW);
        Serial.println("Pin 5 On");
     }
   } else if(access == relay_6) {
     if(status == "off") {
        digitalWrite(pin_6,HIGH);
        Serial.println("Pin 6 Off");
     } else {
        digitalWrite(pin_6,LOW);
        Serial.println("Pin 6 On");
     }
   } else if(access == relay_7) {
     if(status == "off") {
        digitalWrite(pin_7,HIGH);
        Serial.println("Pin 7 Off");
     } else {
        digitalWrite(pin_7,LOW);
        Serial.println("Pin 7 On");
     }
   } else if(access == relay_8) {
     if(status == "host") {
        digitalWrite(pin_8,HIGH);
        Serial.println("Pin 8 Off");
     } else {
        digitalWrite(pin_8,LOW);
        Serial.println("Pin 8 On");
     }
   }

 // Serial.flush();
}
