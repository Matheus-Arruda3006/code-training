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
    long[][] bounds = new long[][] { new long[] { 0, 199 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long[] seen = new long[(int)(200)];
    long checkpoint = -1;
    for (int i = (int)(0); i < n; i++) {
        seen[(int)(cell(data,i,0))] = 1;
        long advance = 1;
        while (advance == 1) {
            advance = 0;
            if (checkpoint+1 < 200) {
                if (seen[(int)(checkpoint+1)] == 1) {
                    checkpoint = checkpoint+1;
                    advance = 1;
                }
            }
        }
        output.Add(checkpoint);
    }
    return output.ToArray();
  }
}
