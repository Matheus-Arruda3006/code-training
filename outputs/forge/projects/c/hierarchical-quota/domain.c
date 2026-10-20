#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[2][2]={{0,99},{1,100}};
  if(!data || data->n<0 || data->n>200 || data->cols!=2){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<2;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll used[100>0?100:1]; memset(used,0,sizeof used);
    ll total = 0;
    for (int i = (int)(0); i < n; i++) {
        ll user = cell(data,i,0);
        ll cost = cell(data,i,1);
        if (used[user]+cost <= 50 && total+cost <= 120) {
            used[user] = used[user]+cost;
            total = total+cost;
            out.values[out.count++] = 1;
        }
        else {
            out.values[out.count++] = 0;
        }
    }
    out.values[out.count++] = total;
  return out;
}
