namespace TD2013LongRunningTasks
{
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    using TD2013LongRunningTasks.App_Start;

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Register the default hubs route: ~/signalr/hubs
            RouteTable.Routes.MapHubs();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            BootstrapBundleConfig.RegisterBundles();
        }
    }
}