namespace TD2013LongRunningTasks.Hubs
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;

    [HubName("tasks")]
    public class LongRunningTaskHub : Hub
    {
        // Dummy data
        private static readonly List<SomeTask> Data = new List<SomeTask>
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
        public Task Execute(StartTaskCommand command)
        {
            // Remove command from client
            this.Clients.Caller.ack(command.Id);

            // Find target from "database"
            var t = Data.First(m => m.Id == command.Id);

            // Process target - delay operation on purpose for better demonstration
            return Task.Factory.StartNew(() => { ProcessTask(t, this.Clients.Caller); });
        }

        private static async void ProcessTask(SomeTask t, dynamic caller)
        {
            var r = new Random();
            await Task.Delay(r.Next(15000));
            t.Operations.Add("Long running operation completed at " + DateTime.Now.ToLongTimeString());

            // Notify caller
            caller.onEvent(new TaskUpdated { AffectedTask = t });
        }
    }

    public class StartTaskCommand
    {
        public Guid Id { get; set; }
    }

    public class TaskUpdated
    {
        public string Name
        {
            get
            {
                return "TaskUpdated";
            }
        }

        public SomeTask AffectedTask { get; set; }
    }

    public class SomeTask
    {
        private readonly List<string> operationsField = new List<string>
                                       {
                                           "Task created at " + DateTime.Now.ToLongTimeString()
                                       };

        public SomeTask()
        {
        }

        public SomeTask(string title): this()
        {
            this.Id = Guid.NewGuid();
            this.Title = title;
        }

        public Guid Id { get; set; }

        public string Title { get; set; }

        public IList<string> Operations
        {
            get
            {
                return this.operationsField;
            }
        }
    }
}