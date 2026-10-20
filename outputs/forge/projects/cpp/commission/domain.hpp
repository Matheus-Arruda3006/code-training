#pragma once
#include <vector>
#include <stdexcept>
#include <algorithm>
#include <cstdlib>
using ll=long long;
using Matrix=std::vector<std::vector<ll>>;
inline ll cell(const Matrix& data,ll row,ll col){return data.at(row).at(col);}
inline ll minv(ll a,ll b){return std::min(a,b);}
inline ll maxv(ll a,ll b){return std::max(a,b);}
inline ll absv(ll a){return std::llabs(a);}
inline ll quotient(ll a,ll b){return a/b;}
inline std::vector<ll> solve(const Matrix& data){
  const ll bounds[4][2]={{0,10000},{0,10000},{0,10000},{0,10000}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=4)throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<4;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;
    for (int i = (int)(0); i < n; i++) {
        ll net = maxv(cell(data,i,0)-cell(data,i,1),0);
        ll commission = quotient(net*cell(data,i,2),10000);
        out.push_back(minv(commission,cell(data,i,3)));
    }
  return out;
}
