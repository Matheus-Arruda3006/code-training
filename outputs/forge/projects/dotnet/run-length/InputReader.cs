using System;
using System.IO;
using System.Linq;
using System.Globalization;
using System.Text.RegularExpressions;
public static class InputReader {
  public static long[][] Read(string path) {
    var lines=File.ReadAllLines(path);
    if(lines.Length==0 || lines[0]!="value") throw new ArgumentException("Cabeçalho inválido");
    return lines.Skip(1).Where(line=>line.Length>0).Select(line=>line.Split('\t').Select(value=>{
      if(!Regex.IsMatch(value,@"^-?[0-9]+$") || !long.TryParse(value,NumberStyles.AllowLeadingSign,CultureInfo.InvariantCulture,out var number))
        throw new ArgumentException("Inteiro inválido");
      return number;
    }).ToArray()).ToArray();
  }
}
