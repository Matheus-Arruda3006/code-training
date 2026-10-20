#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[4][2]={{0,12},{1,100},{1,10000},{0,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=4){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<4;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    for (int i = (int)(0); i < n; i++) {
        ll delay = minv(cell(data,i,1),cell(data,i,2));
        for (int attempt = (int)(0); attempt < cell(data,i,0); attempt++) {
            delay = minv(delay*2,cell(data,i,2));
        }
        ll half = quotient(delay,2);
        out.values[out.count++] = half + cell(data,i,3) % (delay-half+1);
    }
  return out;
}
