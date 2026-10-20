#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[3][2]={{0,10000},{0,100},{1,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=3){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<3;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    for (int i = (int)(0); i < n; i++) {
        ll missing = cell(data,i,2)-cell(data,i,0);
        if (missing <= 0) {
            out.values[out.count++] = 0;
        }
        else {
            ll growth = cell(data,i,1);
            if (growth == 0) {
                out.values[out.count++] = -1;
            }
            else {
                out.values[out.count++] = quotient(missing+growth-1,growth);
            }
        }
    }
  return out;
}
