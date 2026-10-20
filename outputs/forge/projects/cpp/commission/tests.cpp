#include "domain.hpp"
#include <iostream>
void check(const Matrix& input,const std::vector<ll>& expected,bool failure){
  try{auto result=solve(input);if(failure || result!=expected)throw std::runtime_error("Resultado inesperado");}
  catch(const std::invalid_argument&){if(!failure)throw;}
}
int main(){
  check({{10000,1000,1000,800},{100,200,500,100}},{800,0},false);
  check({{999,0,1000,1000}},{99},false);
  check({},{},false);
  check({{-1,0,0,0}},{},true);
  std::cout<<"Todos os casos passaram.\n";
}
