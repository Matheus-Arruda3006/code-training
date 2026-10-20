#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1000,15,30},{999,1,30}},{500,33},false);
  check({{100,32,31}},{},true);
  check({{100,0,28}},{0},false);
  check({},{},false);
  check({{-1,0,1}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
