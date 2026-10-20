import java.util.*;
public final class Domain {
  static long cell(long[][] data,long row,long col){return data[(int)row][(int)col];}
  static long minv(long a,long b){return Math.min(a,b);}
  static long maxv(long a,long b){return Math.max(a,b);}
  static long absv(long a){return Math.abs(a);}
  static long quotient(long a,long b){return a/b;}
  public static long[] solve(long[][] data) {
    long[][] bounds=new long[][] { {0,99} };
    if(data==null || data.length>200)throw new IllegalArgumentException("Ate 200 registros");
    for(long[] row:data){
      if(row==null || row.length!=bounds.length)throw new IllegalArgumentException("Colunas invalidas");
      for(int col=0;col<row.length;col++)if(row[col]<bounds[col][0] || row[col]>bounds[col][1])throw new IllegalArgumentException("Valor fora do contrato");
    }
    int n=data.length;
    var out=new ArrayList<Long>();
    long[] present = new long[(int)(100)];
    long[] frequency = new long[(int)(100)];
    long[] age = new long[(int)(100)];
    long size = 0;
    for (int i = (int)(0); i < n; i++) {
        long key = cell(data,i,0);
        if (present[(int)(key)] == 1) {
            frequency[(int)(key)] = frequency[(int)(key)]+1;
            out.add((long)(1));
        }
        else {
            out.add((long)(0));
            if (size == 3) {
                long victim = -1;
                for (int k = (int)(0); k < 100; k++) {
                    if (present[(int)(k)] == 1) {
                        if (victim == -1) {
                            victim = k;
                        }
                        else {
                            if (frequency[(int)(k)] < frequency[(int)(victim)] || (frequency[(int)(k)] == frequency[(int)(victim)] && age[(int)(k)] < age[(int)(victim)])) {
                                victim = k;
                            }
                        }
                    }
                }
                present[(int)(victim)] = 0;
                size = size-1;
            }
            present[(int)(key)] = 1;
            frequency[(int)(key)] = 1;
            age[(int)(key)] = i;
            size = size+1;
        }
    }
    return out.stream().mapToLong(Long::longValue).toArray();
  }
}
