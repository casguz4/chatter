using Microsoft.AspNetCore.SignalR;

namespace SignalRWebpack.Hubs;

public class ChatHub : Hub
{
    public async Task NewMessage(long username, string message) =>
        await Clients.All.SendAsync("messageReceived", new { username, message });

    public async Task Ping(string pong) =>
        await Clients.Caller.SendAsync("messageReceived", pong);
}