#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[1][2]={{1,100}};
  if(!data || data->n<0 || data->n>200 || data->cols!=1){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<1;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll wave = 0;
    ll used = 0;
    for (int i = (int)(0); i < n; i++) {
        if (used+cell(data,i,0) > 100) {
            wave = wave+1;
            used = 0;
        }
        used = used+cell(data,i,0);
        out.values[out.count++] = wave;
    }
    if (n == 0) {
        out.values[out.count++] = 0;
    }
    else {
        out.values[out.count++] = wave+1;
    }
  return out;
}
