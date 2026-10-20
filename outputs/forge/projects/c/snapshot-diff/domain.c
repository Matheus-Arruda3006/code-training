#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[3][2]={{0,99},{0,1},{0,10000}};
  if(!data || data->n<0 || data->n>200 || data->cols!=3){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<3;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll oldSeen[100>0?100:1]; memset(oldSeen,0,sizeof oldSeen);
    ll newSeen[100>0?100:1]; memset(newSeen,0,sizeof newSeen);
    ll oldValue[100>0?100:1]; memset(oldValue,0,sizeof oldValue);
    ll newValue[100>0?100:1]; memset(newValue,0,sizeof newValue);
    for (int i = (int)(0); i < n; i++) {
        ll id = cell(data,i,0);
        if (cell(data,i,1) == 0) {
            if (oldSeen[id] == 1) {
                out.error=1; return out;
            }
            oldSeen[id] = 1;
            oldValue[id] = cell(data,i,2);
        }
        else {
            if (newSeen[id] == 1) {
                out.error=1; return out;
            }
            newSeen[id] = 1;
            newValue[id] = cell(data,i,2);
        }
    }
    for (int id = (int)(0); id < 100; id++) {
        if (oldSeen[id] == 0 && newSeen[id] == 1) {
            out.values[out.count++] = id;
            out.values[out.count++] = 1;
        }
        if (oldSeen[id] == 1 && newSeen[id] == 0) {
            out.values[out.count++] = id;
            out.values[out.count++] = 3;
        }
        if (oldSeen[id] == 1 && newSeen[id] == 1 && oldValue[id] != newValue[id]) {
            out.values[out.count++] = id;
            out.values[out.count++] = 2;
        }
    }
  return out;
}
