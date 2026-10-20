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
    Check(new long[][] { new long[] { 1, 100 }, new long[] { 2, -30 }, new long[] { 1, 100 } },new long[] { 100, 70, 70 });
    Check(new long[][] { new long[] { 1, 1 }, new long[] { 1, 2 } },null);
    Check(new long[0][],new long[] {  });
    Check(new long[][] { new long[] { -1, -10000 } },null);
    Check(new long[][]{Array.Empty<long>()},null);
    Check(Enumerable.Range(0,201).Select(_=>new long[] { 0, -10000 }).ToArray(),null);
    Console.WriteLine("Todos os casos passaram.");
  }
}
