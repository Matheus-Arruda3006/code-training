import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {1,5},{2,4},{4,6} },new long[] {2,2});
    check(new long[][] { {1,2},{2,3} },new long[] {1,1});
    check(new long[][] {  },new long[] {0,-1});
    check(new long[][] { {-1,0} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][2],null);
    System.out.println("Todos os casos passaram.");
  }
}
