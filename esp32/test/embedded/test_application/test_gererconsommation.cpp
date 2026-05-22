#include <Arduino.h>
#include <unity.h>

#include "GererConsommation.h"
#include "MockCapteur.h"

void test_consommation_retourne_valeur_capteur()
{
    // Arrange
    MockCapteur mock(42);
    GererConsommation service(&mock);

    // Act
    int result = service.calculerConsommation();

    // Assert
    TEST_ASSERT_EQUAL(42, result);
}

void test_consommation_zero()
{
    MockCapteur mock(0);
    GererConsommation service(&mock);

    int result = service.calculerConsommation();

    TEST_ASSERT_EQUAL(0, result);
}

void setup()
{
    delay(2000); // allow serial

    UNITY_BEGIN();

    RUN_TEST(test_consommation_retourne_valeur_capteur);
    RUN_TEST(test_consommation_zero);

    UNITY_END();
}

void loop()
{
    // nothing
}