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
    long[][] bounds = new long[][] { new long[] { 0, 99 }, new long[] { -10000, 10000 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long[] seen = new long[(int)(100)];
    long[] deltas = new long[(int)(100)];
    long balance = 0;
    for (int i = (int)(0); i < n; i++) {
        long id = cell(data,i,0);
        if (seen[(int)(id)] == 1) {
            if (deltas[(int)(id)] != cell(data,i,1)) {
                throw new ArgumentException("Regra de negócio inválida");
            }
        }
        else {
            seen[(int)(id)] = 1;
            deltas[(int)(id)] = cell(data,i,1);
            balance = balance+cell(data,i,1);
        }
        output.Add(balance);
    }
    return output.ToArray();
  }
}
