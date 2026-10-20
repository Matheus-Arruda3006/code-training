import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {0,9},{0,9},{0,10000} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    long[] distance = new long[(int)(10)];
    for (int node = (int)(1); node < 10; node++) {
        distance[(int)(node)] = 1000000000;
    }
    for (int turn = (int)(0); turn < 9; turn++) {
        for (int edge = (int)(0); edge < n; edge++) {
            long originNode = cell(data,edge,0);
            long to = cell(data,edge,1);
            long cost = cell(data,edge,2);
            if (distance[(int)(originNode)] < 1000000000) {
                distance[(int)(to)] = minv(distance[(int)(to)],distance[(int)(originNode)]+cost);
            }
        }
    }
    for (int node = (int)(0); node < 10; node++) {
        if (distance[(int)(node)] == 1000000000) {
            out.add((long)(-1));
        }
        else {
            out.add((long)(distance[(int)(node)]));
        }
    }
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
