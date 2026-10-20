#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[3][2]={{0,99},{0,10000},{0,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=3){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<3;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll balances[100>0?100:1]; memset(balances,0,sizeof balances);
    for (int i = (int)(0); i < n; i++) {
        ll account = cell(data,i,0);
        balances[account] = balances[account] + cell(data,i,1) - cell(data,i,2);
    }
    for (int account = (int)(0); account < 100; account++) {
        if (balances[account] != 0) {
            out.values[out.count++] = account;
            out.values[out.count++] = balances[account];
        }
    }
  return out;
}
