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
    ll peak = 0;
    ll first = -1;
    for (int i = (int)(0); i < n; i++) {
        if (cell(data,i,0) >= cell(data,i,1)) {
            out.error=1; return out;
        }
    }
    for (int i = (int)(0); i < n; i++) {
        ll time = cell(data,i,0);
        ll count = 0;
        for (int j = (int)(0); j < n; j++) {
            if (cell(data,j,0) <= time && cell(data,j,1) > time) {
                count = count+1;
            }
        }
        if (count > peak || (count == peak && (first == -1 || time < first))) {
            peak = count;
            first = time;
        }
    }
    out.values[out.count++] = peak;
    out.values[out.count++] = first;
  return out;
}
