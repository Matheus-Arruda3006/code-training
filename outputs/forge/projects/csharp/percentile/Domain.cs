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
    long[][] bounds = new long[][] { new long[] { 0, 10000 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
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
        output.Add(values[(int)(quotient(50*n+99,100)-1)]);
        output.Add(values[(int)(quotient(95*n+99,100)-1)]);
    }
    return output.ToArray();
  }
}
