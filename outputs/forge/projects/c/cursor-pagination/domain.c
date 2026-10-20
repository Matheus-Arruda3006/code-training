#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[2][2]={{0,10000},{0,99}};
  if(!data || data->n<0 || data->n>200 || data->cols!=2){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<2;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll used[n>0?n:1]; memset(used,0,sizeof used);
    for (int i = (int)(0); i < n; i++) {
        for (int j = (int)(0); j < i; j++) {
            if (cell(data,i,0) == cell(data,j,0) && cell(data,i,1) == cell(data,j,1)) {
                out.error=1; return out;
            }
        }
        if (cell(data,i,0) < 10 || (cell(data,i,0) == 10 && cell(data,i,1) <= 5)) {
            used[i] = 1;
        }
    }
    for (int turn = (int)(0); turn < 3; turn++) {
        ll best = -1;
        for (int i = (int)(0); i < n; i++) {
            if (used[i] == 0) {
                if (best == -1) {
                    best = i;
                }
                else {
                    if (cell(data,i,0) < cell(data,best,0) || (cell(data,i,0) == cell(data,best,0) && cell(data,i,1) < cell(data,best,1))) {
                        best = i;
                    }
                }
            }
        }
        if (best != -1) {
            out.values[out.count++] = cell(data,best,0);
            out.values[out.count++] = cell(data,best,1);
            used[best] = 1;
        }
    }
  return out;
}
