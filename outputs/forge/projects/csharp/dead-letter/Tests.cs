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
    Check(new long[][] { new long[] { 200, 0 }, new long[] { 429, 2 }, new long[] { 503, 5 }, new long[] { 404, 1 } },new long[] { 0, 1, 2, 2 });
    Check(new long[][] { new long[] { 408, 4 } },new long[] { 1 });
    Check(new long[0][],new long[] {  });
    Check(new long[][] { new long[] { 99, 0 } },null);
    Check(new long[][]{Array.Empty<long>()},null);
    Check(Enumerable.Range(0,201).Select(_=>new long[] { 100, 0 }).ToArray(),null);
    Console.WriteLine("Todos os casos passaram.");
  }
}
