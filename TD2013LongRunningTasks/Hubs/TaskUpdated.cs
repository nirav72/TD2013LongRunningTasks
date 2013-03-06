namespace TD2013LongRunningTasks.Hubs
{
    using TD2013LongRunningTasks.Models;

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
}