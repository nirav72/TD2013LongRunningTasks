
namespace TD2013LongRunningTasks.App_Start
{
    using System.Web.Optimization;

    public class BootstrapBundleConfig
    {
        public static void RegisterBundles()
        {
            BundleTable.Bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include("~/Scripts/bootstrap*"));
            BundleTable.Bundles.Add(new StyleBundle("~/Content/bootstrap")
                .Include(
                    "~/Content/bootstrap.css", 
                    "~/Content/site.css",
                    "~/Content/bootstrap-responsive.css",
                    "~/Content/toastr.css"));
        }
    }
}
