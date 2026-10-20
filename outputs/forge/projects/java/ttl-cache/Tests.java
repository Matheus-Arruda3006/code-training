import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {1,0,5},{1,4,5},{1,5,5},{1,9,5} },new long[] {0,1,0,1});
    check(new long[][] { {0,2,1},{0,1,1} },null);
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1,0,1} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][3],null);
    System.out.println("Todos os casos passaram.");
  }
}
