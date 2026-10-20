#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1,100},{2,-30},{1,100}},{100,70,70},false);
  check({{1,1},{1,2}},{},true);
  check({},{},false);
  check({{-1,-10000}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
