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
    Check(new long[][] { new long[] { 0, 6 }, new long[] { 0, 6 }, new long[] { 1, 6 }, new long[] { 4, 10 } },new long[] { 1, 0, 1, 0 });
    Check(new long[][] { new long[] { 2, 1 }, new long[] { 1, 1 } },null);
    Check(new long[0][],new long[] {  });
    Check(new long[][] { new long[] { -1, 1 } },null);
    Check(new long[][]{Array.Empty<long>()},null);
    Check(Enumerable.Range(0,201).Select(_=>new long[] { 0, 1 }).ToArray(),null);
    Console.WriteLine("Todos os casos passaram.");
  }
}
