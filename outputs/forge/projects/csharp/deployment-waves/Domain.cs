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
    long[][] bounds = new long[][] { new long[] { 1, 100 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long wave = 0;
    long used = 0;
    for (int i = (int)(0); i < n; i++) {
        if (used+cell(data,i,0) > 100) {
            wave = wave+1;
            used = 0;
        }
        used = used+cell(data,i,0);
        output.Add(wave);
    }
    if (n == 0) {
        output.Add(0);
    }
    else {
        output.Add(wave+1);
    }
    return output.ToArray();
  }
}
