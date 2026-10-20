import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {0,199} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    long[] seen = new long[(int)(200)];
    long checkpoint = -1;
    for (int i = (int)(0); i < n; i++) {
        seen[(int)(cell(data,i,0))] = 1;
        long advance = 1;
        while (advance == 1) {
            advance = 0;
            if (checkpoint+1 < 200) {
                if (seen[(int)(checkpoint+1)] == 1) {
                    checkpoint = checkpoint+1;
                    advance = 1;
                }
            }
        }
        out.add((long)(checkpoint));
    }
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
