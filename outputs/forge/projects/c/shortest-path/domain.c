#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[3][2]={{0,9},{0,9},{0,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=3){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<3;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll distance[10>0?10:1]; memset(distance,0,sizeof distance);
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
            out.values[out.count++] = -1;
        }
        else {
            out.values[out.count++] = distance[node];
        }
    }
  return out;
}
