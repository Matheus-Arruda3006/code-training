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
  const ll bounds[3][2]={{0,9},{0,9},{0,10000}};
  if(data.size()>200)throw std::invalid_argument("Ate 200 registros");
  for(const auto& row:data){
    if(row.size()!=3)throw std::invalid_argument("Colunas invalidas");
    for(int col=0;col<3;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw std::invalid_argument("Valor fora do contrato");
  }
  int n=static_cast<int>(data.size());
  std::vector<ll> out;
    std::vector<ll> distance(10,0);
    for (int node = (int)(1); node < 10; node++) {
        distance[node] = 1000000000;
    }
    for (int turn = (int)(0); turn < 9; turn++) {
        for (int edge = (int)(0); edge < n; edge++) {
            ll originNode = cell(data,edge,0);
            ll to = cell(data,edge,1);
            ll cost = cell(data,edge,2);
            if (distance[originNode] < 1000000000) {
                distance[to] = minv(distance[to],distance[originNode]+cost);
            }
        }
    }
    for (int node = (int)(0); node < 10; node++) {
        if (distance[node] == 1000000000) {
            out.push_back(-1);
        }
        else {
            out.push_back(distance[node]);
        }
    }
  return out;
}
