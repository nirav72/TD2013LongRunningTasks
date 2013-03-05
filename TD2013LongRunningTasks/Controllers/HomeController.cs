namespace TD2013LongRunningTasks.Controllers
{
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            this.ViewBag.Page = "mytasks";
            return this.SpaPageView;
        }

        // Could use catch all route instead
        public ActionResult About()
        {
            this.ViewBag.Page = "about";
            return this.SpaPageView;
        }

        private ActionResult SpaPageView
        {
            get
            {
                return this.View("Index");
            }
        }
    }
}
