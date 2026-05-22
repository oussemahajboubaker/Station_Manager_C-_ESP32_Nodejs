#ifndef GERERCONSOMMATION_H
#define GERERCONSOMMATION_H

#include "ICapteur.h"

class GererConsommation
{
private:
    ICapteur* capteur;

public:
    GererConsommation(ICapteur* capteur);
    int calculerConsommation();
};

#endif