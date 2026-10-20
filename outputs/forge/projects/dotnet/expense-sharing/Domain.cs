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
    long[][] bounds = new long[][] { new long[] { 1, 100 }, new long[] { 0, 10000 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long total = 0;
    long weights = 0;
    for (int i = (int)(0); i < n; i++) {
        total = total+cell(data,i,1);
        weights = weights+cell(data,i,0);
    }
    long[] shares = new long[(int)(n)];
    long[] remainders = new long[(int)(n)];
    long assigned = 0;
    for (int i = (int)(0); i < n; i++) {
        shares[(int)(i)] = quotient(total*cell(data,i,0),weights);
        remainders[(int)(i)] = (total*cell(data,i,0)) % weights;
        assigned = assigned+shares[(int)(i)];
    }
    while (assigned < total) {
        long best = 0;
        for (int i = (int)(1); i < n; i++) {
            if (remainders[(int)(i)] > remainders[(int)(best)]) {
                best = i;
            }
        }
        shares[(int)(best)] = shares[(int)(best)]+1;
        remainders[(int)(best)] = -1;
        assigned = assigned+1;
    }
    for (int i = (int)(0); i < n; i++) {
        output.Add(shares[(int)(i)]);
    }
    return output.ToArray();
  }
}
