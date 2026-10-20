#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[2][2]={{-1,199},{1,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=2){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<2;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll finish[n>0?n:1]; memset(finish,0,sizeof finish);
    ll deadline = 0;
    for (int i = (int)(0); i < n; i++) {
        ll parent = cell(data,i,0);
        if (parent >= i) {
            out.error=1; return out;
        }
        ll start = 0;
        if (parent >= 0) {
            start = finish[parent];
        }
        finish[i] = start+cell(data,i,1);
        deadline = maxv(deadline,finish[i]);
        out.values[out.count++] = finish[i];
    }
    out.values[out.count++] = deadline;
  return out;
}
