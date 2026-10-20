#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{10},{8},{3},{20},{15}},{1,1,0,1,1,15},false);
  check({{0}},{1,0},false);
  check({},{0},false);
  check({{-1}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
