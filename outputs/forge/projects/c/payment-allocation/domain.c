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
    ll credit = 0;
    for (int i = (int)(0); i < n; i++) {
        credit = credit + cell(data,i,1);
    }
    for (int i = (int)(0); i < n; i++) {
        ll paid = minv(credit,cell(data,i,0));
        credit = credit-paid;
        out.values[out.count++] = cell(data,i,0)-paid;
    }
    out.values[out.count++] = credit;
  return out;
}
