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
    long[][] bounds = new long[][] { new long[] { 0, 10000 }, new long[] { 0, 99 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long[] used = new long[(int)(n)];
    for (int i = (int)(0); i < n; i++) {
        for (int j = (int)(0); j < i; j++) {
            if (cell(data,i,0) == cell(data,j,0) && cell(data,i,1) == cell(data,j,1)) {
                throw new ArgumentException("Regra de negócio inválida");
            }
        }
        if (cell(data,i,0) < 10 || (cell(data,i,0) == 10 && cell(data,i,1) <= 5)) {
            used[(int)(i)] = 1;
        }
    }
    for (int turn = (int)(0); turn < 3; turn++) {
        long best = -1;
        for (int i = (int)(0); i < n; i++) {
            if (used[(int)(i)] == 0) {
                if (best == -1) {
                    best = i;
                }
                else {
                    if (cell(data,i,0) < cell(data,best,0) || (cell(data,i,0) == cell(data,best,0) && cell(data,i,1) < cell(data,best,1))) {
                        best = i;
                    }
                }
            }
        }
        if (best != -1) {
            output.Add(cell(data,best,0));
            output.Add(cell(data,best,1));
            used[(int)(best)] = 1;
        }
    }
    return output.ToArray();
  }
}
