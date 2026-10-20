import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {11,3},{10,7},{10,5},{12,1},{10,6} },new long[] {10,6,10,7,11,3});
    check(new long[][] { {10,6},{10,6} },null);
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1,0} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][2],null);
    System.out.println("Todos os casos passaram.");
  }
}
