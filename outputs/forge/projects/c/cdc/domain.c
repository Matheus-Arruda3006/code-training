#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[4][2]={{0,99},{1,10000},{0,1},{0,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=4){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<4;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll version[100>0?100:1]; memset(version,0,sizeof version);
    ll present[100>0?100:1]; memset(present,0,sizeof present);
    ll values[100>0?100:1]; memset(values,0,sizeof values);
    for (int i = (int)(0); i < n; i++) {
        ll id = cell(data,i,0);
        if (cell(data,i,1) > version[id]) {
            version[id] = cell(data,i,1);
            present[id] = 1-cell(data,i,2);
            values[id] = cell(data,i,3);
        }
    }
    for (int id = (int)(0); id < 100; id++) {
        if (present[id] == 1) {
            out.values[out.count++] = id;
            out.values[out.count++] = values[id];
        }
    }
  return out;
}
