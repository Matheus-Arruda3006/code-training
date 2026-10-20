#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{60},{50},{40},{20}},{0,1,1,2,3},false);
  check({{100},{100}},{0,1,2},false);
  check({},{0},false);
  check({{0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
