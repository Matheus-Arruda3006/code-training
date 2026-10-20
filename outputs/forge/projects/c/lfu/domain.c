#include "domain.h"
#include <string.h>
ll cell(const Matrix* data,ll row,ll col){return data->values[row][col];}
ll minv(ll a,ll b){return a<b?a:b;}
ll maxv(ll a,ll b){return a>b?a:b;}
ll absv(ll a){return a<0?-a:a;}
ll quotient(ll a,ll b){return a/b;}
Result solve(const Matrix* data){
  Result out={0};
  const ll bounds[1][2]={{0,99}};
  if(!data || data->n<0 || data->n>200 || data->cols!=1){out.error=1;return out;}
  for(int i=0;i<data->n;i++)for(int col=0;col<1;col++)
    if(data->values[i][col]<bounds[col][0] || data->values[i][col]>bounds[col][1]){out.error=1;return out;}
  int n=data->n;
    ll present[100>0?100:1]; memset(present,0,sizeof present);
    ll frequency[100>0?100:1]; memset(frequency,0,sizeof frequency);
    ll age[100>0?100:1]; memset(age,0,sizeof age);
    ll size = 0;
    for (int i = (int)(0); i < n; i++) {
        ll key = cell(data,i,0);
        if (present[key] == 1) {
            frequency[key] = frequency[key]+1;
            out.values[out.count++] = 1;
        }
        else {
            out.values[out.count++] = 0;
            if (size == 3) {
                ll victim = -1;
                for (int k = (int)(0); k < 100; k++) {
                    if (present[k] == 1) {
                        if (victim == -1) {
                            victim = k;
                        }
                        else {
                            if (frequency[k] < frequency[victim] || (frequency[k] == frequency[victim] && age[k] < age[victim])) {
                                victim = k;
                            }
                        }
                    }
                }
                present[victim] = 0;
                size = size-1;
            }
            present[key] = 1;
            frequency[key] = 1;
            age[key] = i;
            size = size+1;
        }
    }
  return out;
}
