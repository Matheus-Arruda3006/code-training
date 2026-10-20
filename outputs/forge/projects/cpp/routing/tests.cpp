#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{10,5},{100,20},{50,10}},{1},false);
  check({{1,2}},{0},false);
  check({},{-1},false);
  check({{0,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
