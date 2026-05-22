#ifndef CAPTEUREAU_H
#define CAPTEUREAU_H

#include "ICapteur.h"

class CapteurEau : public ICapteur
{
public:
    int compter() override;
};

#endif