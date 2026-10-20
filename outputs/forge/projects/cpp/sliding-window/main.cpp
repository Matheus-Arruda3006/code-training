#include "domain.hpp"
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
int main(int argc,char** argv){
  try{
    std::ifstream input(argc>1?argv[1]:"input.tsv");
    std::string line;
    if(!std::getline(input,line))throw std::invalid_argument("Arquivo vazio");
    if(!line.empty()&&line.back()=='\r')line.pop_back();
    if(line!="time")throw std::invalid_argument("Cabecalho invalido");
    Matrix data;
    while(std::getline(input,line)){
      if(!line.empty()&&line.back()=='\r')line.pop_back();
      if(line.empty())continue;
      if(line.back()=='\t')throw std::invalid_argument("Campo vazio");
      std::istringstream stream(line);std::string part;std::vector<ll> row;
      while(std::getline(stream,part,'\t')){
        auto start=part.size()>0&&part[0]=='-'?1u:0u;
        if(start==part.size() || part.find_first_not_of("0123456789",start)!=std::string::npos)throw std::invalid_argument("Inteiro invalido");
        row.push_back(std::stoll(part));
      }
      data.push_back(row);
      if(data.size()>200)throw std::invalid_argument("Limite excedido");
    }
    auto result=solve(data);std::cout<<"[";
    for(std::size_t i=0;i<result.size();i++){if(i)std::cout<<",";std::cout<<result[i];}
    std::cout<<"]\n";
  }catch(const std::exception& error){std::cerr<<error.what()<<"\n";return 1;}
}
