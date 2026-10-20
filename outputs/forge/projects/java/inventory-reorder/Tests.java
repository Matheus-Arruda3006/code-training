import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {20,5,5,10,12},{100,2,3,5,10} },new long[] {24,0});
    check(new long[][] { {0,0,0,1,5} },new long[] {5});
    check(new long[][] {  },new long[] {});
    check(new long[][] { {-1,0,0,0,1} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][5],null);
    System.out.println("Todos os casos passaram.");
  }
}
