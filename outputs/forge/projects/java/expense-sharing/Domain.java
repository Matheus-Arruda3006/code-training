import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {1,100},{0,10000} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    long total = 0;
    long weights = 0;
    for (int i = (int)(0); i < n; i++) {
        total = total+cell(data,i,1);
        weights = weights+cell(data,i,0);
    }
    long[] shares = new long[(int)(n)];
    long[] remainders = new long[(int)(n)];
    long assigned = 0;
    for (int i = (int)(0); i < n; i++) {
        shares[(int)(i)] = quotient(total*cell(data,i,0),weights);
        remainders[(int)(i)] = (total*cell(data,i,0)) % weights;
        assigned = assigned+shares[(int)(i)];
    }
    while (assigned < total) {
        long best = 0;
        for (int i = (int)(1); i < n; i++) {
            if (remainders[(int)(i)] > remainders[(int)(best)]) {
                best = i;
            }
        }
        shares[(int)(best)] = shares[(int)(best)]+1;
        remainders[(int)(best)] = -1;
        assigned = assigned+1;
    }
    for (int i = (int)(0); i < n; i++) {
        out.add((long)(shares[(int)(i)]));
    }
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
