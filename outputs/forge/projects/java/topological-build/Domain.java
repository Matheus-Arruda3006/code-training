import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {0,19},{0,19} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    long[] active = new long[(int)(20)];
    long[] indegree = new long[(int)(20)];
    long[] removed = new long[(int)(20)];
    for (int i = (int)(0); i < n; i++) {
        active[(int)(cell(data,i,0))] = 1;
        active[(int)(cell(data,i,1))] = 1;
        indegree[(int)(cell(data,i,1))] = indegree[(int)(cell(data,i,1))]+1;
    }
    for (int turn = (int)(0); turn < 20; turn++) {
        long best = -1;
        for (int node = (int)(0); node < 20; node++) {
            if (active[(int)(node)] == 1 && removed[(int)(node)] == 0 && indegree[(int)(node)] == 0 && best == -1) {
                best = node;
            }
        }
        if (best != -1) {
            out.add((long)(best));
            removed[(int)(best)] = 1;
            for (int i = (int)(0); i < n; i++) {
                if (cell(data,i,0) == best) {
                    indegree[(int)(cell(data,i,1))] = indegree[(int)(cell(data,i,1))]-1;
                }
            }
        }
    }
    for (int node = (int)(0); node < 20; node++) {
        if (active[(int)(node)] == 1 && removed[(int)(node)] == 0) {
            throw new IllegalArgumentException("Regra de negocio invalida");
        }
    }
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
