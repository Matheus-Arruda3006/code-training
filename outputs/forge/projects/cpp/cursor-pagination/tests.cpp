#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{11,3},{10,7},{10,5},{12,1},{10,6}},{10,6,10,7,11,3},false);
  check({{10,6},{10,6}},{},true);
  check({},{},false);
  check({{-1,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
