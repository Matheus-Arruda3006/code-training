#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1,100,70},{1,30,60},{2,50,20}},{2,30},false);
  check({{3,10,20}},{3,-10},false);
  check({},{},false);
  check({{-1,0,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
