var Notifications;
(function (Notifications) {
    var NotificationsViewModel = (function () {
        function NotificationsViewModel() {
            this.error = ko.observable();
            this.warning = ko.observable();
            this.success = ko.observable();
            this.errorQueue = $.Topic("message/error");
            this.warningQueue = $.Topic("message/warning");
            this.infoQueue = $.Topic("message/info");
            this.settingsQueue = $.Topic("message/settingsChanged");
            this.loaded = ko.observable(false);
            this.settingsQueue.subscribe(this.settingsChanged.bind(this));
            var s = new Notifications.Settings();
            s.useLegacyMessages = false;
            s.useToasts = true;
            this.settingsQueue.publish(s);
        }
        NotificationsViewModel.prototype.settingsChanged = function (s) {
            this.errorQueue.unsubscribe();
            this.warningQueue.unsubscribe();
            this.infoQueue.unsubscribe();
            if(s.useLegacyMessages) {
                this.errorQueue.subscribe(this.error);
                this.warningQueue.subscribe(this.warning);
                this.infoQueue.subscribe(this.success);
            }
            if(s.useToasts) {
                this.errorQueue.subscribe(toastr.error);
                this.warningQueue.subscribe(toastr.warning);
                this.infoQueue.subscribe(toastr.success);
            }
        };
        return NotificationsViewModel;
    })();
    Notifications.NotificationsViewModel = NotificationsViewModel;    
    NotificationsViewModel.instance = new NotificationsViewModel();
    ko.applyBindings(NotificationsViewModel.instance, document.getElementById("messages"));
    NotificationsViewModel.instance.loaded(true);
})(Notifications || (Notifications = {}));
