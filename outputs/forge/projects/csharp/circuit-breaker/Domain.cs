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
    long[][] bounds = new long[][] { new long[] { 0, 10000 }, new long[] { 0, 1 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long failures = 0;
    long until = 0;
    for (int i = (int)(0); i < n; i++) {
        long now = cell(data,i,0);
        if (i > 0) {
            if (now < cell(data,i-1,0)) {
                throw new ArgumentException("Regra de negócio inválida");
            }
        }
        if (now < until) {
            output.Add(0);
        }
        else {
            output.Add(1);
            if (cell(data,i,1) == 1) {
                failures = 0;
            }
            else {
                failures = failures+1;
            }
            if (failures >= 3) {
                until = now+5;
            }
        }
    }
    return output.ToArray();
  }
}
