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
  Matrix input0={.n=5,.cols=2,.values={{0,50},{1,50},{2,30},{2,20},{0,1}}};
  ll expected0[]={1,1,0,1,0,120};
  check(input0,expected0,6,0);
  Matrix input1={.n=1,.cols=2,.values={{1,51}}};
  ll expected1[]={0,0};
  check(input1,expected1,2,0);
  Matrix input2={.n=0,.cols=2,.values={{0}}};
  ll expected2[]={0};
  check(input2,expected2,1,0);
  Matrix input3={.n=1,.cols=2,.values={{-1,1}}};
  ll expected3[]={0};
  check(input3,expected3,0,1);
  puts("Todos os casos passaram.");return 0;
}
