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
    long[][] bounds = new long[][] { new long[] { 0, 9 }, new long[] { 0, 9 }, new long[] { 0, 10000 } };
    foreach(var row in data) {
      if(row is null || row.Length!=bounds.Length) throw new ArgumentException("Colunas inválidas");
      for(int col=0;col<row.Length;col++)
        if(row[col]<bounds[col][0] || row[col]>bounds[col][1]) throw new ArgumentException("Valor fora do contrato");
    }
    int n=data.Length;
    var output=new List<long>();
    long[] distance = new long[(int)(10)];
    for (int node = (int)(1); node < 10; node++) {
        distance[(int)(node)] = 1000000000;
    }
    for (int turn = (int)(0); turn < 9; turn++) {
        for (int edge = (int)(0); edge < n; edge++) {
            long originNode = cell(data,edge,0);
            long to = cell(data,edge,1);
            long cost = cell(data,edge,2);
            if (distance[(int)(originNode)] < 1000000000) {
                distance[(int)(to)] = minv(distance[(int)(to)],distance[(int)(originNode)]+cost);
            }
        }
    }
    for (int node = (int)(0); node < 10; node++) {
        if (distance[(int)(node)] == 1000000000) {
            output.Add(-1);
        }
        else {
            output.Add(distance[(int)(node)]);
        }
    }
    return output.ToArray();
  }
}
