#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{0,10,100,0},{3,10,50,10}},{5,35},false);
  check({{12,100,10,100}},{9},false);
  check({},{},false);
  check({{-1,1,1,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
