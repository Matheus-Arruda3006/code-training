import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {0,10,100,0},{3,10,50,10} },new long[] {5,35});
    check(new long[][] { {12,100,10,100} },new long[] {9});
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1,1,1,0} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][4],null);
    System.out.println("Todos os casos passaram.");
  }
}
