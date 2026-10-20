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
    long[][] bounds = new long[][] { new long[] { 0, 10000 }, new long[] { 0, 10000 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long selected = -1;
    for (int i = (int)(0); i < n; i++) {
        long votes = 0;
        for (int j = (int)(0); j < n; j++) {
            if (cell(data,i,0) == cell(data,j,0) && cell(data,i,1) == cell(data,j,1)) {
                votes = votes+1;
            }
        }
        if (votes*2 > n) {
            selected = i;
        }
    }
    if (selected == -1) {
        output.Add(-1);
    }
    else {
        output.Add(cell(data,selected,0));
        output.Add(cell(data,selected,1));
    }
    return output.ToArray();
  }
}
