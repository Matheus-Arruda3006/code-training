import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {0,10000},{0,10000} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    long peak = 0;
    long first = -1;
    for (int i = (int)(0); i < n; i++) {
        if (cell(data,i,0) >= cell(data,i,1)) {
            throw new IllegalArgumentException("Regra de negocio invalida");
        }
    }
    for (int i = (int)(0); i < n; i++) {
        long time = cell(data,i,0);
        long count = 0;
        for (int j = (int)(0); j < n; j++) {
            if (cell(data,j,0) <= time && cell(data,j,1) > time) {
                count = count+1;
            }
        }
        if (count > peak || (count == peak && (first == -1 || time < first))) {
            peak = count;
            first = time;
        }
    }
    out.add((long)(peak));
    out.add((long)(first));
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
