#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1,0,10},{1,1,20},{2,0,0},{3,1,0}},{1,2,2,3,3,1},false);
  check({{1,0,1},{1,0,2}},{},true);
  check({},{},false);
  check({{-1,0,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
