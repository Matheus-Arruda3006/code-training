import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {2},{0},{1},{1},{4},{3} },new long[] {-1,0,2,2,2,4});
    check(new long[][] { {0} },new long[] {0});
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][1],null);
    System.out.println("Todos os casos passaram.");
  }
}
