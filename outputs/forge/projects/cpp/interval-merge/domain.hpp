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
  const ll bounds[2][2]={{0,10000},{0,10000}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=2)throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<2;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;
    ll start = -1;
    ll end = -1;
    for (int i = (int)(0); i < n; i++) {
        if (cell(data,i,0) >= cell(data,i,1)) {
            throw std::invalid_argument("Regra de negocio invalida");
        }
        if (i > 0) {
            if (cell(data,i,0) < cell(data,i-1,0)) {
                throw std::invalid_argument("Regra de negocio invalida");
            }
        }
        if (start == -1) {
            start = cell(data,i,0);
            end = cell(data,i,1);
        }
        else {
            if (cell(data,i,0) <= end) {
                end = maxv(end,cell(data,i,1));
            }
            else {
                out.push_back(start);
                out.push_back(end);
                start = cell(data,i,0);
                end = cell(data,i,1);
            }
        }
    }
    if (start != -1) {
        out.push_back(start);
        out.push_back(end);
    }
  return out;
}
