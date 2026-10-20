#include "domain.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <ctype.h>
int main(int argc,char** argv){
  FILE* input=fopen(argc>1?argv[1]:"input.tsv","r");
  if(!input){perror("input");return 1;}
  Matrix data={0};data.cols=1;char line[4096];int valid=1;
  if(!fgets(line,sizeof line,input)){fclose(input);return 1;}
  line[strcspn(line,"\r\n")]=0;
  if(strcmp(line,"cost")!=0){fclose(input);return 1;}
  while(fgets(line,sizeof line,input)){
    line[strcspn(line,"\r\n")]=0;if(!line[0])continue;
    if(data.n==200){valid=0;break;}
    char* cursor=line;
    for(int col=0;col<data.cols;col++){
      char* end;char* digits=cursor+(*cursor=='-');
      if(!isdigit((unsigned char)*digits)){valid=0;break;}
      errno=0;ll value=strtoll(cursor,&end,10);
      if(errno || end==cursor || (col<data.cols-1?*end!='\t':*end!=0)){valid=0;break;}
      data.values[data.n][col]=value;cursor=end+(*end!=0);
    }
    if(!valid)break;data.n++;
  }
  fclose(input);if(!valid){fprintf(stderr,"Entrada invalida\n");return 1;}
  Result result=solve(&data);if(result.error){fprintf(stderr,"Regra invalida\n");return 1;}
  printf("[");for(int i=0;i<result.count;i++){if(i)printf(",");printf("%lld",result.values[i]);}puts("]");return 0;
}
