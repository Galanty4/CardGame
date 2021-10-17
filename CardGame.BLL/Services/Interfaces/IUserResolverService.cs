using System;
using System.Collections.Generic;
using System.Text;

namespace CardGame.BLL.Services.Internal
{
    public interface IUserResolverService
    {
        string GetCurrentUserIp();
    }
}
