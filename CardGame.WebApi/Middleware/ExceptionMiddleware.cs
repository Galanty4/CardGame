using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using CardGame.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;

namespace CardGame.WebApi.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IDiagnosticContext _diagnosticContext;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IDiagnosticContext diagnosticContext, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _diagnosticContext = diagnosticContext;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                context.Request.EnableBuffering();
                await _next(context);
            }
            catch(Exception exception)
            {

                context.Request.Body.Position = 0;
                using (var stream = new StreamReader(context.Request.Body))
                {
                    var requestBody = await stream.ReadToEndAsync();
                    _diagnosticContext.Set("RequestBody", requestBody);
                }

                _diagnosticContext.Set("ErrorMessage", exception.Message);
                _diagnosticContext.Set("StackTrace", exception.StackTrace);

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var response = new ErrorResponse(exception.Message, _env.IsDevelopment() ? exception.StackTrace : null);

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                await context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
            }
        }
    }
}
