#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1,2,0,20},{1,3,1,0},{1,1,0,10},{2,1,0,7}},{2,7},false);
  check({{0,1,0,0}},{0,0},false);
  check({},{},false);
  check({{-1,1,0,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
