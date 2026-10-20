import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {0,10000} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    long[] values = new long[(int)(n)];
    for (int i = (int)(0); i < n; i++) {
        values[(int)(i)] = cell(data,i,0);
        long j = i;
        while (j > 0) {
            if (values[(int)(j-1)] > values[(int)(j)]) {
                long swap = values[(int)(j-1)];
                values[(int)(j-1)] = values[(int)(j)];
                values[(int)(j)] = swap;
            }
            j = j-1;
        }
    }
    if (n > 0) {
        out.add((long)(values[(int)(quotient(50*n+99,100)-1)]));
        out.add((long)(values[(int)(quotient(95*n+99,100)-1)]));
    }
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
