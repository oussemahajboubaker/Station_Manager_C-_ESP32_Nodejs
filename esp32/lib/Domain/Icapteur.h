#ifndef ICAPTEUR_H
#define ICAPTEUR_H

class ICapteur
{
public:
    virtual int compter() = 0;
    virtual ~ICapteur() {}
};

#endif