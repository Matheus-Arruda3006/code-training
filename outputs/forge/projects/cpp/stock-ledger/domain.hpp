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
  const ll bounds[3][2]={{0,99},{0,2},{1,10000}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=3)throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<3;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;
    std::vector<ll> stock(100,0);
    for (int i = (int)(0); i < n; i++) {
        ll sku = cell(data,i,0);
        ll action = cell(data,i,1);
        ll quantity = cell(data,i,2);
        if (action == 0) {
            stock[sku] = stock[sku]+quantity;
        }
        if (action == 1 && quantity > stock[sku]) {
            out.push_back(-1);
        }
        else {
            if (action == 1) {
                stock[sku] = stock[sku]-quantity;
            }
            out.push_back(stock[sku]);
        }
    }
  return out;
}
