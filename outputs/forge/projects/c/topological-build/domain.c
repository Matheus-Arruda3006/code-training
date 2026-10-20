#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[2][2]={{0,19},{0,19}};
  if(!data || data->n<0 || data->n>200 || data->cols!=2){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<2;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll active[20>0?20:1]; memset(active,0,sizeof active);
    ll indegree[20>0?20:1]; memset(indegree,0,sizeof indegree);
    ll removed[20>0?20:1]; memset(removed,0,sizeof removed);
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
            out.values[out.count++] = best;
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
            out.error=1; return out;
        }
    }
  return out;
}
