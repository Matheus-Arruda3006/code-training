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
    Check(new long[][] { new long[] { 1000, 15, 30 }, new long[] { 999, 1, 30 } },new long[] { 500, 33 });
    Check(new long[][] { new long[] { 100, 32, 31 } },null);
    Check(new long[][] { new long[] { 100, 0, 28 } },new long[] { 0 });
    Check(new long[0][],new long[] {  });
    Check(new long[][] { new long[] { -1, 0, 1 } },null);
    Check(new long[][]{Array.Empty<long>()},null);
    Check(Enumerable.Range(0,201).Select(_=>new long[] { 0, 0, 1 }).ToArray(),null);
    Console.WriteLine("Todos os casos passaram.");
  }
}
