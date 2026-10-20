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
    long[][] bounds = new long[][] { new long[] { 0, 99 }, new long[] { 0, 1 }, new long[] { 0, 10000 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long[] oldSeen = new long[(int)(100)];
    long[] newSeen = new long[(int)(100)];
    long[] oldValue = new long[(int)(100)];
    long[] newValue = new long[(int)(100)];
    for (int i = (int)(0); i < n; i++) {
        long id = cell(data,i,0);
        if (cell(data,i,1) == 0) {
            if (oldSeen[(int)(id)] == 1) {
                throw new ArgumentException("Regra de negócio inválida");
            }
            oldSeen[(int)(id)] = 1;
            oldValue[(int)(id)] = cell(data,i,2);
        }
        else {
            if (newSeen[(int)(id)] == 1) {
                throw new ArgumentException("Regra de negócio inválida");
            }
            newSeen[(int)(id)] = 1;
            newValue[(int)(id)] = cell(data,i,2);
        }
    }
    for (int id = (int)(0); id < 100; id++) {
        if (oldSeen[(int)(id)] == 0 && newSeen[(int)(id)] == 1) {
            output.Add(id);
            output.Add(1);
        }
        if (oldSeen[(int)(id)] == 1 && newSeen[(int)(id)] == 0) {
            output.Add(id);
            output.Add(3);
        }
        if (oldSeen[(int)(id)] == 1 && newSeen[(int)(id)] == 1 && oldValue[(int)(id)] != newValue[(int)(id)]) {
            output.Add(id);
            output.Add(2);
        }
    }
    return output.ToArray();
  }
}
