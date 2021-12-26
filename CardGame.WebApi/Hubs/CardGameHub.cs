using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace CardGame.WebApi.Hubs
{
    public class CardGameHub: Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;

        public CardGameHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "Game Master";
            _connections = connections;
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            if (_connections.Sum(x => x.Value.Room == userConnection.Room ? 1 : 0) >= 2) // drewniana walidacja ilości użytkowników w grupie
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser,
                $"{userConnection.User} was trying to join {userConnection.Room}");
                return;
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, 
                $"{userConnection.User} has joined {userConnection.Room}");

            await SendUsersConnected(userConnection.Room);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
        }

        public async Task ChangeCardPosition(int playerCard, int[] position)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                await Clients.OthersInGroup(userConnection.Room).SendAsync("ReceiveCardPosition", userConnection.User, playerCard, position);
        }

        public async Task PlayerAttack(int player1Card, int player2Card)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                await Clients.Group(userConnection.Room).SendAsync("ReceivePlayerAttack", userConnection.User, player1Card, player2Card);
        }

        public async Task EndTurn(int turn)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                await Clients.Group(userConnection.Room).SendAsync("ReceiveTurnChange", userConnection.User, turn);
        }

        public async Task GetCard(int playerDeckCard)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                await Clients.Group(userConnection.Room).SendAsync("ReceiveCardFromDeck", userConnection.User, playerDeckCard);
        }

        public async Task ActivateCard(int playerCard, int state)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                await Clients.Group(userConnection.Room).SendAsync("ReceiveActivateCard", userConnection.User, playerCard, state);
        }

        public async Task DeactivateCard(int playerCard, int state)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
                await Clients.Group(userConnection.Room).SendAsync("ReceiveDeactivateCard", userConnection.User, playerCard, state);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
