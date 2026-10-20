import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {10,10,2},{12,10,2},{13,10,2} },new long[] {2,1,0});
    check(new long[][] { {1,2,0} },new long[] {2});
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1,0,0} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][3],null);
    System.out.println("Todos os casos passaram.");
  }
}
