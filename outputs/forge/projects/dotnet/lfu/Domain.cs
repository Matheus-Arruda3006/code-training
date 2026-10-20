using System;
using System.Collections.Generic;
public static class Domain {
  static long cell(long[][] data, long row, long col) => data[(int)row][(int)col];
  static long minv(long a,long b) => Math.Min(a,b);
  static long maxv(long a,long b) => Math.Max(a,b);
  static long absv(long a) => Math.Abs(a);
  static long quotient(long a,long b) => a/b;
  public static long[] Solve(long[][] data) {
    if (data is null || data.Length>200) throw new ArgumentException("Até 200 registros");
    long[][] bounds = new long[][] { new long[] { 0, 99 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long[] present = new long[(int)(100)];
    long[] frequency = new long[(int)(100)];
    long[] age = new long[(int)(100)];
    long size = 0;
    for (int i = (int)(0); i < n; i++) {
        long key = cell(data,i,0);
        if (present[(int)(key)] == 1) {
            frequency[(int)(key)] = frequency[(int)(key)]+1;
            output.Add(1);
        }
        else {
            output.Add(0);
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
    return output.ToArray();
  }
}
