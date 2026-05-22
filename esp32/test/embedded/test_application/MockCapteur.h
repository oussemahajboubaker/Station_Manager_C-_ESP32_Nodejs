#ifndef MOCKCAPTEUR_H
#define MOCKCAPTEUR_H

#include "ICapteur.h"

class MockCapteur : public ICapteur
{
private:
    int value;

public:
    MockCapteur(int v) : value(v) {}

    int compter() override
    {
        return value;
    }
};

#endif