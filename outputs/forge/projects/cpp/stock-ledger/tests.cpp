#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1,0,10},{1,1,12},{1,1,4},{1,2,1}},{10,-1,6,6},false);
  check({{0,1,1}},{-1},false);
  check({},{},false);
  check({{-1,0,1}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
