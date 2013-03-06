namespace TD2013LongRunningTasks.Models
{
    using System;
    using System.Collections.Generic;

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