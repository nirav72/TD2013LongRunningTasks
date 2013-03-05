var Things;
(function (Things) {
    var ThingListViewModel = (function () {
        function ThingListViewModel() {
            var _this = this;
            this.thingList = ko.observable();
            this.loaded = ko.observable(false);
            this.error = $.Topic("message/error");
            this.warning = $.Topic("message/warning");
            this.info = $.Topic("message/info");
            this.hub = $.connection.tasks;
            var sendTransport = new JSBus.SignalRSendTransport(this.hub.server), subscribeTransport = new JSBus.SignalRSubscribeTransport(this.hub.client);
            this.bus = new JSBus.Bus("tasks", sendTransport, subscribeTransport);
            this.bus.subscribe(function (msg) {
                _this.thingList().replace(new Things.Thing(msg.AffectedTask));
            }, "TaskUpdated");
            $.connection.hub.start(function () {
                _this.hub.server.getTasks().then(function (tasks) {
                    ;
                    _this.thingList(new Things.ThingList(tasks));
                    _this.loaded(true);
                }).fail(function () {
                    _this.error.publish("Error retrieving data from server");
                });
            });
        }
        ThingListViewModel.prototype.longOperation = function () {
            var _this = this;
            var checked = this.thingList().CheckedItems();
            checked.forEach(function (m) {
                m.OperationPending(true);
                m.IsChecked(false);
                _this.bus.send({
                    id: m.Id
                });
            });
            this.info.publish("Processing " + checked.length + " items...");
        };
        return ThingListViewModel;
    })();
    Things.ThingListViewModel = ThingListViewModel;    
    ThingListViewModel.instance = new ThingListViewModel();
    ThingListViewModel.instance.loaded.subscribe(function () {
        ko.applyBindings(ThingListViewModel.instance, document.getElementById("mytasks-layout"));
    });
})(Things || (Things = {}));
