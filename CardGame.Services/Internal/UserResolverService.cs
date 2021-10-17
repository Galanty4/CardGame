using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using CardGame.BLL.Services.Internal;
using Microsoft.AspNetCore.Http;

namespace CardGame.Services.Internal
{
    public class UserResolverService : IUserResolverService
    {
        public string GetCurrentUserIp()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("No network adapters with an IPv4 address in the system!");
        }
    }
}
