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
    Check(new long[][] { new long[] { 10, 10, 2 }, new long[] { 12, 10, 2 }, new long[] { 13, 10, 2 } },new long[] { 2, 1, 0 });
    Check(new long[][] { new long[] { 1, 2, 0 } },new long[] { 2 });
    Check(new long[0][],new long[] {  });
    Check(new long[][] { new long[] { -1, 0, 0 } },null);
    Check(new long[][]{Array.Empty<long>()},null);
    Check(Enumerable.Range(0,201).Select(_=>new long[] { 0, 0, 0 }).ToArray(),null);
    Console.WriteLine("Todos os casos passaram.");
  }
}
