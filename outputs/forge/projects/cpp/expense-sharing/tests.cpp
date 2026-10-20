#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1,10},{1,0},{1,0}},{4,3,3},false);
  check({{1,10},{3,0}},{3,7},false);
  check({},{},false);
  check({{0,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
