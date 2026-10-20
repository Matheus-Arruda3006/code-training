#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{200,0},{429,2},{503,5},{404,1}},{0,1,2,2},false);
  check({{408,4}},{1},false);
  check({},{},false);
  check({{99,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
