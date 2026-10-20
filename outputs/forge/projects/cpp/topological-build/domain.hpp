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
  const ll bounds[2][2]={{0,19},{0,19}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=2)throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<2;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;
    std::vector<ll> active(20,0);
    std::vector<ll> indegree(20,0);
    std::vector<ll> removed(20,0);
    for (int i = (int)(0); i < n; i++) {
        active[cell(data,i,0)] = 1;
        active[cell(data,i,1)] = 1;
        indegree[cell(data,i,1)] = indegree[cell(data,i,1)]+1;
    }
    for (int turn = (int)(0); turn < 20; turn++) {
        ll best = -1;
        for (int node = (int)(0); node < 20; node++) {
            if (active[node] == 1 && removed[node] == 0 && indegree[node] == 0 && best == -1) {
                best = node;
            }
        }
        if (best != -1) {
            out.push_back(best);
            removed[best] = 1;
            for (int i = (int)(0); i < n; i++) {
                if (cell(data,i,0) == best) {
                    indegree[cell(data,i,1)] = indegree[cell(data,i,1)]-1;
                }
            }
        }
    }
    for (int node = (int)(0); node < 20; node++) {
        if (active[node] == 1 && removed[node] == 0) {
            throw std::invalid_argument("Regra de negocio invalida");
        }
    }
  return out;
}
