#include <WiFi.h>
#include <WebServer.h>

#include "GererConsommation.h"
#include "CapteurEau.h"
#include "CapteurElectricite.h"

const char* ssid = "Galaxy S20 FE BB52";
const char* password = "11111111";

WebServer server(80);

// global pointer (we swap implementations dynamically)
ICapteur* capteur = nullptr;
GererConsommation* service = nullptr;

void setup(){
    Serial.begin(9600);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nConnected");
    Serial.println(WiFi.localIP());

    server.on("/consommation", HTTP_GET, []()
    {
        if (!server.hasArg("type"))
        {
            server.send(400, "text/plain", "missing type");
            return;
        }

        String type = server.arg("type");

        // 🔥 DEPENDENCY INJECTION DECISION HERE
        delete capteur;
        delete service;


        if (type == "eau")
            capteur = new CapteurEau();
        else
            capteur = new CapteurElectricite();

        service = new GererConsommation(capteur);

        int result = service->calculerConsommation();

        server.send(200, "text/plain", String(result));
    });

    server.begin();
}

void loop()
{
    server.handleClient();
}