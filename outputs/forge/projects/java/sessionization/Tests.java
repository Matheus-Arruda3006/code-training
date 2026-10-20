import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {1,0},{2,10},{1,30},{1,61},{2,20} },new long[] {1,1,1,2,1});
    check(new long[][] { {1,4},{1,3} },null);
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1,0} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][2],null);
    System.out.println("Todos os casos passaram.");
  }
}
