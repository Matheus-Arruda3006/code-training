#include "domain.h"
#include <stdio.h>
#include <stdlib.h>
void check(Matrix input,const ll* expected,int length,int failure){
  Result result=solve(&input);
  if((!!result.error)!=failure){fprintf(stderr,"Erro inesperado\n");exit(1);}
  if(failure)return;
  if(result.count!=length){fprintf(stderr,"Tamanho inesperado\n");exit(1);}
  for(int i=0;i<length;i++)if(result.values[i]!=expected[i]){fprintf(stderr,"Valor inesperado\n");exit(1);}
}
int main(void){
  Matrix input0={.n=3,.cols=3,.values={{9,5,10},{15,3,10},{10,2,10}}};
  ll expected0[]={5,2,1};
  check(input0,expected0,3,0);
  Matrix input1={.n=1,.cols=3,.values={{0,7,1}}};
  ll expected1[]={7};
  check(input1,expected1,1,0);
  Matrix input2={.n=0,.cols=3,.values={{0}}};
  ll expected2[]={0};
  check(input2,expected2,1,0);
  Matrix input3={.n=1,.cols=3,.values={{-1,0,0}}};
  ll expected3[]={0};
  check(input3,expected3,0,1);
  puts("Todos os casos passaram.");return 0;
}
