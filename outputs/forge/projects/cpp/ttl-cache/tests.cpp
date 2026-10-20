#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1,0,5},{1,4,5},{1,5,5},{1,9,5}},{0,1,0,1},false);
  check({{0,2,1},{0,1,1}},{},true);
  check({},{},false);
  check({{-1,0,1}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
