namespace TD2013LongRunningTasks.App_Start
{
    using System.Web.Optimization;

    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/sammy-{version}.js",
                        "~/Scripts/sammy.title.js",
                        "~/Scripts/pubsub.js",
                        "~/Scripts/jquery.SignalR-{version}.js",
                        "~/Scripts/toastr.js",
                        "~/Scripts/routes.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
            "~/Scripts/knockout-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/JSBus")
                .Include("~/Scripts/JSBus/TransportInterfaces.js")
                .Include("~/Scripts/JSBus/LocalStorageStore.js")
                .Include("~/Scripts/JSBus/LocalStorageQueue.js")
                .Include("~/Scripts/JSBus/Bus.js")
                .Include("~/Scripts/JSBus/SignalRSendTransport.js")
                .Include("~/Scripts/JSBus/SignalRSubscribeTransport.js")
            );

            // Business logic bundles
            bundles.Add(new ScriptBundle("~/bundles/things")
                .Include("~/Scripts/Things/*.js"));
            bundles.Add(new ScriptBundle("~/bundles/notifications")
                .Include("~/Scripts/Notifications/Settings.js")
                .Include("~/Scripts/Notifications/NotificationsViewModel.js"));
        }
    }
}