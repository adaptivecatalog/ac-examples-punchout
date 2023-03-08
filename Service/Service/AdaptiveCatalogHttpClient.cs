using System.Text.Json;
using System.Text.Json.Serialization;

namespace Service;

public class AdaptiveCatalogHttpClient
{
    private string? _url;
    private readonly HttpClient _http;
    public AdaptiveCatalogHttpClient(HttpClient client, string baseUrl)
    {
        _http = client;
        _url = baseUrl;
    }
    
    private async Task<T?> BuildRequest<T>(HttpMethod method, string path, object? content = null) 
    {

        var msg = BuildMessage(method, path, content);
        var response = await _http.SendAsync(msg);
        
        if (response.IsSuccessStatusCode) return await response.Content.ReadFromJsonAsync<T>();
        throw new BadHttpRequestException(response.Content.ToString() ?? "Error from request");
    }

    private HttpRequestMessage BuildMessage(HttpMethod method, string path, object? content)
    {
        var msg = new HttpRequestMessage(method, _url + "/" + path);
        msg.Headers.Add("Accept", $"application/json");
        msg.Headers.Add("Cache-Control", "no-cache");

        if (content != null)
            msg.Content = JsonContent.Create(content, options:
                new JsonSerializerOptions { DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull });
        return msg;
    }

    public Task<T?> Get<T>(string path) where T : class => BuildRequest<T>(HttpMethod.Get, path);
    public Task<T?> Delete<T>(string path) where T : class => BuildRequest<T>(HttpMethod.Delete, path);
    public Task<T?> Post<T>(string path, object body) where T : class => BuildRequest<T>(HttpMethod.Post, path, body);
    public Task<T?> Put<T>(string path, object body) where T : class => BuildRequest<T>(HttpMethod.Put, path, body);
    public Task<T?> Patch<T>(string path, object body) where T : class => BuildRequest<T>(HttpMethod.Patch, path, body);
}