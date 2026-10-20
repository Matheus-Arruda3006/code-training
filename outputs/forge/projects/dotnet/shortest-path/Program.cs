using System.Text.Json;
if(args.Contains("--test")) { Tests.Run(); return; }
var builder=WebApplication.CreateBuilder(args);
var app=builder.Build();
app.MapGet("/health",()=>Results.Ok(new {status="ok"}));
app.MapPost("/solve",(SolveRequest request)=>{
  try { return Results.Ok(new {result=Domain.Solve(request.Data)}); }
  catch(ArgumentException error) { return Results.BadRequest(new {error=error.Message}); }
});
app.Run();
record SolveRequest(long[][] Data);
