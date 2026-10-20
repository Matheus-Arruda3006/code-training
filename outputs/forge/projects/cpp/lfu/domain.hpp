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
  const ll bounds[1][2]={{0,99}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=1)throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<1;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;
    std::vector<ll> present(100,0);
    std::vector<ll> frequency(100,0);
    std::vector<ll> age(100,0);
    ll size = 0;
    for (int i = (int)(0); i < n; i++) {
        ll key = cell(data,i,0);
        if (present[key] == 1) {
            frequency[key] = frequency[key]+1;
            out.push_back(1);
        }
        else {
            out.push_back(0);
            if (size == 3) {
                ll victim = -1;
                for (int k = (int)(0); k < 100; k++) {
                    if (present[k] == 1) {
                        if (victim == -1) {
                            victim = k;
                        }
                        else {
                            if (frequency[k] < frequency[victim] || (frequency[k] == frequency[victim] && age[k] < age[victim])) {
                                victim = k;
                            }
                        }
                    }
                }
                present[victim] = 0;
                size = size-1;
            }
            present[key] = 1;
            frequency[key] = 1;
            age[key] = i;
            size = size+1;
        }
    }
  return out;
}
