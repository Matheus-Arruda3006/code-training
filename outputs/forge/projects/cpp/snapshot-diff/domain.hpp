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
  const ll bounds[3][2]={{0,99},{0,1},{0,10000}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=3)throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<3;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;
    std::vector<ll> oldSeen(100,0);
    std::vector<ll> newSeen(100,0);
    std::vector<ll> oldValue(100,0);
    std::vector<ll> newValue(100,0);
    for (int i = (int)(0); i < n; i++) {
        ll id = cell(data,i,0);
        if (cell(data,i,1) == 0) {
            if (oldSeen[id] == 1) {
                throw std::invalid_argument("Regra de negocio invalida");
            }
            oldSeen[id] = 1;
            oldValue[id] = cell(data,i,2);
        }
        else {
            if (newSeen[id] == 1) {
                throw std::invalid_argument("Regra de negocio invalida");
            }
            newSeen[id] = 1;
            newValue[id] = cell(data,i,2);
        }
    }
    for (int id = (int)(0); id < 100; id++) {
        if (oldSeen[id] == 0 && newSeen[id] == 1) {
            out.push_back(id);
            out.push_back(1);
        }
        if (oldSeen[id] == 1 && newSeen[id] == 0) {
            out.push_back(id);
            out.push_back(3);
        }
        if (oldSeen[id] == 1 && newSeen[id] == 1 && oldValue[id] != newValue[id]) {
            out.push_back(id);
            out.push_back(2);
        }
    }
  return out;
}
