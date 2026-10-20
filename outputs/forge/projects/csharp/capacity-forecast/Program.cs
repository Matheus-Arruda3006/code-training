using System.Text.Json;
if(args.Contains("--test")) { Tests.Run(); return; }
try { Console.WriteLine(JsonSerializer.Serialize(Domain.Solve(InputReader.Read(args.Length>0?args[0]:"input.tsv")))); }
catch(ArgumentException error) { Console.Error.WriteLine(error.Message); Environment.ExitCode=1; }
