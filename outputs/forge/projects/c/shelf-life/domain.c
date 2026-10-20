#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[3][2]={{0,10000},{0,10000},{0,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=3){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<3;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll used[n>0?n:1]; memset(used,0,sizeof used);
    ll expired = 0;
    for (int i = (int)(0); i < n; i++) {
        if (cell(data,i,0) < cell(data,i,2)) {
            used[i] = 1;
            expired = expired+cell(data,i,1);
        }
    }
    out.values[out.count++] = expired;
    for (int turn = (int)(0); turn < n; turn++) {
        ll best = -1;
        for (int i = (int)(0); i < n; i++) {
            if (used[i] == 0) {
                if (best == -1) {
                    best = i;
                }
                else {
                    if (cell(data,i,0) < cell(data,best,0)) {
                        best = i;
                    }
                }
            }
        }
        if (best != -1) {
            out.values[out.count++] = best;
            used[best] = 1;
        }
    }
  return out;
}
