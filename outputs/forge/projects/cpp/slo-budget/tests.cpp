#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{10000,5,9990},{1000,2,9990}},{5,0,0,1},false);
  check({{1,2,9000}},{},true);
  check({},{},false);
  check({{0,0,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
