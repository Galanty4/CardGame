using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardGame.Common
{
    public class ErrorResponse
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }

        public ErrorResponse(string message, string stackTrace)
        {
            Message = message;
            StackTrace = stackTrace;
        }
    }
}
