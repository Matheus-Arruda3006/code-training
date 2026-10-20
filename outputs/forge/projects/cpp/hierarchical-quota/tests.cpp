#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{0,50},{1,50},{2,30},{2,20},{0,1}},{1,1,0,1,0,120},false);
  check({{1,51}},{0,0},false);
  check({},{0},false);
  check({{-1,1}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
