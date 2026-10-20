import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {0,10000},{0,10000},{0,10000} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    long[] used = new long[(int)(n)];
    long expired = 0;
    for (int i = (int)(0); i < n; i++) {
        if (cell(data,i,0) < cell(data,i,2)) {
            used[(int)(i)] = 1;
            expired = expired+cell(data,i,1);
        }
    }
    out.add((long)(expired));
    for (int turn = (int)(0); turn < n; turn++) {
        long best = -1;
        for (int i = (int)(0); i < n; i++) {
            if (used[(int)(i)] == 0) {
                if (best == -1) {
                    best = i;
                }
                else {
                    if (cell(data,i,0) < cell(data,best,0)) {
                        best = i;
                    }
                }
            }
        }
        if (best != -1) {
            out.add((long)(best));
            used[(int)(best)] = 1;
        }
    }
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
