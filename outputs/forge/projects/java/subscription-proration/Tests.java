import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {1000,15,30},{999,1,30} },new long[] {500,33});
    check(new long[][] { {100,32,31} },null);
    check(new long[][] { {100,0,28} },new long[] {0});
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1,0,1} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][3],null);
    System.out.println("Todos os casos passaram.");
  }
}
