import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {0,99},{0,10000},{-10000,10000} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    long[] versions = new long[(int)(100)];
    long[] balances = new long[(int)(100)];
    for (int i = (int)(0); i < n; i++) {
        long id = cell(data,i,0);
        if (versions[(int)(id)] == cell(data,i,1)) {
            balances[(int)(id)] = balances[(int)(id)]+cell(data,i,2);
            versions[(int)(id)] = versions[(int)(id)]+1;
            out.add((long)(versions[(int)(id)]));
        }
        else {
            out.add((long)(-1));
        }
    }
    long total = 0;
    for (int id = (int)(0); id < 100; id++) {
        total = total+balances[(int)(id)];
    }
    out.add((long)(total));
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
