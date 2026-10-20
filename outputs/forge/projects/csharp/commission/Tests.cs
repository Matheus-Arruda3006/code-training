using System;
using System.Linq;
public static class Tests {
  static void Check(long[][] input,long[]? expected) {
    try {
      var actual=Domain.Solve(input);
      if(expected is null || !actual.SequenceEqual(expected)) throw new Exception("Resultado inesperado");
    } catch(ArgumentException) { if(expected is not null) throw; }
  }
  public static void Run() {
    Check(new long[][] { new long[] { 10000, 1000, 1000, 800 }, new long[] { 100, 200, 500, 100 } },new long[] { 800, 0 });
    Check(new long[][] { new long[] { 999, 0, 1000, 1000 } },new long[] { 99 });
    Check(new long[0][],new long[] {  });
    Check(new long[][] { new long[] { -1, 0, 0, 0 } },null);
    Check(new long[][]{Array.Empty<long>()},null);
    Check(Enumerable.Range(0,201).Select(_=>new long[] { 0, 0, 0, 0 }).ToArray(),null);
    Console.WriteLine("Todos os casos passaram.");
  }
}
