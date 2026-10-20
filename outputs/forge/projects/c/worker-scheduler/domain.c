#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[2][2]={{0,10000},{1,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=2){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<2;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll available[3>0?3:1]; memset(available,0,sizeof available);
    for (int i = (int)(0); i < n; i++) {
        ll best = 0;
        for (int worker = (int)(1); worker < 3; worker++) {
            if (available[worker] < available[best]) {
                best = worker;
            }
        }
        available[best] = maxv(available[best],cell(data,i,0))+cell(data,i,1);
        out.values[out.count++] = best;
        out.values[out.count++] = available[best];
    }
  return out;
}
