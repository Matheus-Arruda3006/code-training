import java.util.*;
public class Tests {
  static void check(long[][] input,long[] expected){
    try { var actual=Domain.solve(input); if(expected==null || !Arrays.equals(actual,expected))throw new AssertionError("Resultado inesperado"); }
    catch(IllegalArgumentException error){ if(expected!=null)throw error; }
  }
  public static void main(String[] args){
    check(new long[][] { {60},{50},{40},{50} },new long[] {0,1,0,1,2});
    check(new long[][] { {100},{1} },new long[] {0,1,2});
    check(new long[][] {  },new long[] {0});
    check(new long[][] { {0} },null);
    check(new long[][]{new long[0]},null);
    check(new long[201][1],null);
    System.out.println("Todos os casos passaram.");
  }
}
