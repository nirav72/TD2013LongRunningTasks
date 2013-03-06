namespace TD2013LongRunningTasks.Hubs
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;

    using TD2013LongRunningTasks.Models;

    [HubName("tasks")]
    public class LongRunningTaskHub : Hub
    {
        // Dummy data
        private static readonly List<SomeTask> Data 
            = new List<SomeTask>
                    {
                        new SomeTask("Lots of"), 
                        new SomeTask("Random"), 
                        new SomeTask("List items"), 
                        new SomeTask("here!"),
                        new SomeTask("In real"),
                        new SomeTask("life"),
                        new SomeTask("things"),
                        new SomeTask("would be"),
                        new SomeTask("way more complex.")
                    };

        public IEnumerable<SomeTask> GetTasks()
        {
            return Data;
        }

        /// <summary>
        /// Start (artificially) long running task.
        /// </summary>
        /// <param name="command">Incoming command</param>
        public Task Execute(StartTaskCommand command)
        {
            // Should save item to msg DB here.
            // Should find correct command handler based on incoming command type here.
            
            // Remove command from client
            this.Clients.Caller.ack(command.Id);

            // Find target from "database"
            var t = Data.First(m => m.Id == command.Id);

            // Process target - delay operation on purpose 
            // for better demonstration effect
            return Task.Factory.StartNew(
                () => { ProcessTask(t, this.Clients.Caller); });
        }

        private static async void ProcessTask(SomeTask t, dynamic caller)
        {
            var r = new Random();
            await Task.Delay(r.Next(15000));
            t.Operations.Add(
                "Long running operation completed at " 
                + DateTime.Now.ToLongTimeString());

            // Notify caller
            caller.onEvent(
                new TaskUpdated { AffectedTask = t });
        }
    }
}