#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[2][2]={{0,10000},{0,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=2){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<2;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll start = -1;
    ll end = -1;
    for (int i = (int)(0); i < n; i++) {
        if (cell(data,i,0) >= cell(data,i,1)) {
            out.error=1; return out;
        }
        if (i > 0) {
            if (cell(data,i,0) < cell(data,i-1,0)) {
                out.error=1; return out;
            }
        }
        if (start == -1) {
            start = cell(data,i,0);
            end = cell(data,i,1);
        }
        else {
            if (cell(data,i,0) <= end) {
                end = maxv(end,cell(data,i,1));
            }
            else {
                out.values[out.count++] = start;
                out.values[out.count++] = end;
                start = cell(data,i,0);
                end = cell(data,i,1);
            }
        }
    }
    if (start != -1) {
        out.values[out.count++] = start;
        out.values[out.count++] = end;
    }
  return out;
}
