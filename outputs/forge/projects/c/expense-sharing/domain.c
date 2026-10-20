#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[2][2]={{1,100},{0,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=2){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<2;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll total = 0;
    ll weights = 0;
    for (int i = (int)(0); i < n; i++) {
        total = total+cell(data,i,1);
        weights = weights+cell(data,i,0);
    }
    ll shares[n>0?n:1]; memset(shares,0,sizeof shares);
    ll remainders[n>0?n:1]; memset(remainders,0,sizeof remainders);
    ll assigned = 0;
    for (int i = (int)(0); i < n; i++) {
        shares[i] = quotient(total*cell(data,i,0),weights);
        remainders[i] = (total*cell(data,i,0)) % weights;
        assigned = assigned+shares[i];
    }
    while (assigned < total) {
        ll best = 0;
        for (int i = (int)(1); i < n; i++) {
            if (remainders[i] > remainders[best]) {
                best = i;
            }
        }
        shares[best] = shares[best]+1;
        remainders[best] = -1;
        assigned = assigned+1;
    }
    for (int i = (int)(0); i < n; i++) {
        out.values[out.count++] = shares[i];
    }
  return out;
}
