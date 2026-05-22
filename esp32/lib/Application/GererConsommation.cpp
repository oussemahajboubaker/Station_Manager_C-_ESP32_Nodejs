#include "GererConsommation.h"

GererConsommation::GererConsommation(ICapteur* capteur)
{
    this->capteur = capteur;
}

int GererConsommation::calculerConsommation()
{
    return capteur->compter();
}