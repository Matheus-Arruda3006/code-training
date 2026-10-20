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
    ll values[n>0?n:1]; memset(values,0,sizeof values);
    for (int i = (int)(0); i < n; i++) {
        values[i] = cell(data,i,0);
        ll j = i;
        while (j > 0) {
            if (values[j-1] > values[j]) {
                ll swap = values[j-1];
                values[j-1] = values[j];
                values[j] = swap;
            }
            j = j-1;
        }
    }
    if (n > 0) {
        out.values[out.count++] = values[quotient(50*n+99,100)-1];
        out.values[out.count++] = values[quotient(95*n+99,100)-1];
    }
  return out;
}
