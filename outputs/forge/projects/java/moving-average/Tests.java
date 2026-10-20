import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {10},{20},{30},{100} },new long[] {10,15,20,50});
    check(new long[][] { {1},{2} },new long[] {1,1});
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][1],null);
    System.out.println("Todos os casos passaram.");
  }
}
