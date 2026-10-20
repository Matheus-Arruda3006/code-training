#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{100,1,100,2},{100,1,100,3}},{1,0},false);
  check({{10,11,10,0}},{},true);
  check({},{},false);
  check({{0,0,1,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
