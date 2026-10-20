#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1,1,100,100,0},{1,2,1,100,0},{1,1,10,100,1}},{1,0,0},false);
  check({{0,0,101,100,0}},{0},false);
  check({},{},false);
  check({{-1,0,0,0,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
