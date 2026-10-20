import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {0,5},{0,2},{0,3},{1,1} },new long[] {0,5,1,2,2,3,1,3});
    check(new long[][] { {10,2} },new long[] {0,12});
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1,1} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][2],null);
    System.out.println("Todos os casos passaram.");
  }
}
