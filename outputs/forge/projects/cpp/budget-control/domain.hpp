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
  const ll bounds[3][2]={{0,99},{0,10000},{0,10000}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=3)throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<3;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;
    std::vector<ll> balances(100,0);
    for (int i = (int)(0); i < n; i++) {
        ll dept = cell(data,i,0);
        balances[dept] = balances[dept]+cell(data,i,1);
        if (cell(data,i,2) <= balances[dept]) {
            balances[dept] = balances[dept]-cell(data,i,2);
            out.push_back(1);
        }
        else {
            out.push_back(0);
        }
    }
    ll total = 0;
    for (int dept = (int)(0); dept < 100; dept++) {
        total = total+balances[dept];
    }
    out.push_back(total);
  return out;
}
