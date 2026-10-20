import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {1,100,80},{1,0,30},{2,50,20} },new long[] {1,0,1,50});
    check(new long[][] { {0,0,1} },new long[] {0,0});
    check(new long[][] {  },new long[] {0});
    check(new long[][] { {-1,0,0} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][3],null);
    System.out.println("Todos os casos passaram.");
  }
}
