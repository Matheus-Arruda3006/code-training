import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {1,1,100,100,0},{1,2,1,100,0},{1,1,10,100,1} },new long[] {1,0,0});
    check(new long[][] { {0,0,101,100,0} },new long[] {0});
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1,0,0,0,0} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][5],null);
    System.out.println("Todos os casos passaram.");
  }
}
