import java.nio.file.*;
import java.util.*;
public class Main {
  public static void main(String[] args) throws Exception {
    var lines=Files.readAllLines(Path.of(args.length>0?args[0]:"input.tsv"));
    if(lines.isEmpty() || !lines.get(0).equals("entity\texpected_version\tdelta"))throw new IllegalArgumentException("Cabecalho invalido");
    var rows=new ArrayList<long[]>();
    for(String line:lines.subList(1,lines.size())){
      if(line.isEmpty())continue;
      String[] values=line.split("\t",-1);
      long[] row=new long[values.length];
      for(int i=0;i<values.length;i++){
        if(!values[i].matches("-?[0-9]+"))throw new IllegalArgumentException("Inteiro invalido");
        row[i]=Long.parseLong(values[i]);
      }
      rows.add(row);
    }
    System.out.println(Arrays.toString(Domain.solve(rows.toArray(long[][]::new))));
  }
}
