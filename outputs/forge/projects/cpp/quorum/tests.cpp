#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{2,10},{2,10},{3,11}},{2,10},false);
  check({{2,10},{2,11}},{-1},false);
  check({},{-1},false);
  check({{-1,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
