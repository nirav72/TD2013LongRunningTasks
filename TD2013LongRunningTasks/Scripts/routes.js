/// <reference path="sammy-0.7.1-vsdoc.js"/>
/// <reference path="sammy.title.js"/>

var app = Sammy('#maincontent', function () {

    var allPages = $(".spapage"),
        navi = $("ul.nav > li");

    var defaultRoute = function(sammy) {
        var viewName = (sammy.params["view"] || "mytasks").toLowerCase(),
            viewToOpen = document.getElementById(viewName),
            jqViewToOpen;

        if (viewToOpen) {
            jqViewToOpen = $(viewToOpen);
            
            if (!jqViewToOpen.is(":visible")) {
                allPages.hide();
                jqViewToOpen.show();
            }
            
            // Change navigation active tab
            navi.removeClass("active")
                .filter("#nav" + viewName)
                .addClass("active");

            // Change page title
            this.title(jqViewToOpen.data("page-title"));
        }
    };
    
    this.use(Sammy.Title);
    this.setTitle("TD2013 -");

    this.get("/", defaultRoute);
    this.get("/:view", defaultRoute);
});

// Use server routed url for start
app.run(window.location.pathname);