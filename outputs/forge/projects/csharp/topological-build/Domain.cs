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
    long[][] bounds = new long[][] { new long[] { 0, 19 }, new long[] { 0, 19 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long[] active = new long[(int)(20)];
    long[] indegree = new long[(int)(20)];
    long[] removed = new long[(int)(20)];
    for (int i = (int)(0); i < n; i++) {
        active[(int)(cell(data,i,0))] = 1;
        active[(int)(cell(data,i,1))] = 1;
        indegree[(int)(cell(data,i,1))] = indegree[(int)(cell(data,i,1))]+1;
    }
    for (int turn = (int)(0); turn < 20; turn++) {
        long best = -1;
        for (int node = (int)(0); node < 20; node++) {
            if (active[(int)(node)] == 1 && removed[(int)(node)] == 0 && indegree[(int)(node)] == 0 && best == -1) {
                best = node;
            }
        }
        if (best != -1) {
            output.Add(best);
            removed[(int)(best)] = 1;
            for (int i = (int)(0); i < n; i++) {
                if (cell(data,i,0) == best) {
                    indegree[(int)(cell(data,i,1))] = indegree[(int)(cell(data,i,1))]-1;
                }
            }
        }
    }
    for (int node = (int)(0); node < 20; node++) {
        if (active[(int)(node)] == 1 && removed[(int)(node)] == 0) {
            throw new ArgumentException("Regra de negócio inválida");
        }
    }
    return output.ToArray();
  }
}
