#ifndef CAPTEURELECTRICITE_H
#define CAPTEURELECTRICITE_H

#include "ICapteur.h"

class CapteurElectricite : public ICapteur
{
public:
    int compter() override;
};

#endif