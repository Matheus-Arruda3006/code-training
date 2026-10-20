#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[1][2]={{0,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=1){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<1;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll small = 0;
    ll medium = 0;
    ll large = 0;
    for (int i = (int)(0); i < n; i++) {
        if (cell(data,i,0) <= 10) {
            small = small+1;
        }
        if (cell(data,i,0) <= 50) {
            medium = medium+1;
        }
        if (cell(data,i,0) <= 100) {
            large = large+1;
        }
    }
    out.values[out.count++] = small;
    out.values[out.count++] = medium;
    out.values[out.count++] = large;
    out.values[out.count++] = n;
  return out;
}
