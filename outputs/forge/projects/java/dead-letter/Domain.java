import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {100,599},{0,20} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    for (int i = (int)(0); i < n; i++) {
        long status = cell(data,i,0);
        if (status >= 200 && status < 300) {
            out.add((long)(0));
        }
        else {
            if ((status == 408 || status == 429 || status >= 500) && cell(data,i,1) < 5) {
                out.add((long)(1));
            }
            else {
                out.add((long)(2));
            }
        }
    }
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
