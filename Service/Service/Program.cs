using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Service;
using Service.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddHttpClient();
builder.Services.Configure<PunchoutConfigs>(builder.Configuration.GetSection("PunchoutConfigs"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddMemoryCache();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//We're turning off CORS to make local development easier, but we recommend making a more restrictive choice for a production app.
app.UseCors(a => a
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

//This endpoint is called from the web client, and it will forward a request to Adaptive Catalog using your API key for authentication.
//Make sure you've entered the correct information in appsettings.json  appsettings.Development.json under the PunchoutConfigs section, as that is used here.
app.MapPost("api/punchout/setup", async (HttpClient client, IOptions<PunchoutConfigs> config) => {
    var acClient = new AdaptiveCatalogHttpClient(client, config.Value.AdaptiveCatalogBaseUrl);
    var request = new PunchoutSetupRequest {
        CallbackUrl = $"{config.Value.ServiceBaseUrl}/api/punchout/orderredirect",
        Company = config.Value.Organization,
        Username = config.Value.Username,
        ApiKey = config.Value.ApiKey
    };
    
    var response = await acClient.Post<PunchoutSetupResponse>("api/jsonpunchout/setup", request);
    return Results.Ok(response);
});

//Adaptive Catalog will call this endpoint with the order payload upon clicking the "Submit" button on a workspace.
//This needs to match the URL you provided in the punchout setup request.
//The response will be a URL that matches a route on the web app, but with a parameter for the id of the order details we've now stored.
app.MapPost("api/punchout/orderredirect", (PunchoutOrder order, IOptions<PunchoutConfigs> config, IMemoryCache dataStore) => {
    try
    {
        //We're using some in-memory cache here just to make the handoff between Adaptive Catalog and our example app.
        //You will probably want to integrate with your own datastore and use that to stash the workspace data.
        dataStore.Set(order.Id, order, TimeSpan.FromSeconds(60));
    }
    catch (Exception e)
    {
        Console.WriteLine(e);
        return Results.BadRequest(e.Message);
    }

    return Results.Ok($"{config.Value.WebBaseUrl}/order?workspaceId={order.Id}");
});

//This request is called from the web client to retrieve the data from the stored workspace data.
app.MapGet("api/punchout/order/{orderId}", (string orderId, IMemoryCache dataStore) =>
    {
        return dataStore.TryGetValue<PunchoutOrder>(orderId, out var order) ? Results.Ok(order) : Results.NotFound();
    }
);

app.UseHttpsRedirection();


app.Run();