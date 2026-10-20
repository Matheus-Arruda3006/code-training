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
  const ll bounds[2][2]={{1,100},{0,10000}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=2)throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<2;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;
    ll total = 0;
    ll weights = 0;
    for (int i = (int)(0); i < n; i++) {
        total = total+cell(data,i,1);
        weights = weights+cell(data,i,0);
    }
    std::vector<ll> shares(n,0);
    std::vector<ll> remainders(n,0);
    ll assigned = 0;
    for (int i = (int)(0); i < n; i++) {
        shares[i] = quotient(total*cell(data,i,0),weights);
        remainders[i] = (total*cell(data,i,0)) % weights;
        assigned = assigned+shares[i];
    }
    while (assigned < total) {
        ll best = 0;
        for (int i = (int)(1); i < n; i++) {
            if (remainders[i] > remainders[best]) {
                best = i;
            }
        }
        shares[best] = shares[best]+1;
        remainders[best] = -1;
        assigned = assigned+1;
    }
    for (int i = (int)(0); i < n; i++) {
        out.push_back(shares[i]);
    }
  return out;
}
