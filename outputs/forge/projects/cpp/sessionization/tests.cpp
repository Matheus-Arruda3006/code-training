#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{1,0},{2,10},{1,30},{1,61},{2,20}},{1,1,1,2,1},false);
  check({{1,4},{1,3}},{},true);
  check({},{},false);
  check({{-1,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
