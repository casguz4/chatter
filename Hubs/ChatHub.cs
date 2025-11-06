using Microsoft.AspNetCore.SignalR;

namespace SignalRWebpack.Hubs;

public class ChatHub : Hub
{
    public async Task NewMessage(long username, string message) =>
        await Clients.All.SendAsync("messageReceived", new { username, message });

    public async Task Ping(string message)
    {
        if (message != "PING")
            await Clients.Caller.SendAsync("notification", new { message = "MISS" });

        await Pong();
    }

    public async Task Pong() =>
        await Clients.Caller.SendAsync("notification", new { message = "PONG" });
}
