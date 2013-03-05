/// <reference path="../jquery.d.ts" />
/// <reference path="../pubsub.ts" />
/// <reference path="../knockout-2.2.d.ts" />
/// <reference path="Dtos.ts" />
/// <reference path="Thing.ts" />
/// <reference path="ThingList.ts" />
/// <reference path="../JSBus/Bus.ts" />
/// <reference path="../JSBus/SignalRSendTransport.ts" />
/// <reference path="../JSBus/SignalRSubscribeTransport.ts" />
module Things {
    
    export class ThingListViewModel {

        static instance: ThingListViewModel;
            
        thingList: KnockoutObservableAny = ko.observable();

        loaded: KnockoutObservableBool = ko.observable(false);

        error = $.Topic("message/error");
        warning = $.Topic("message/warning");
        info = $.Topic("message/info");

        // JSBus
        bus: any;
        hub: any = $.connection.tasks;

        constructor () {
            // Initialize SignalR data transfer used in client/server operation
            var sendTransport = new JSBus.SignalRSendTransport(this.hub.server),
                subscribeTransport = new JSBus.SignalRSubscribeTransport(this.hub.client);

            this.bus = new JSBus.Bus("tasks", sendTransport, subscribeTransport);

            // Subscribe to server event "TaskUpdated"
            this.bus.subscribe(msg => {
                this.thingList().replace(new Thing(msg.AffectedTask));
            }, "TaskUpdated");

            // Open persistent connection to server
            $.connection.hub.start(() => {

                // Load initial state from the server
                this.hub.server.getTasks().then(tasks => {;
                    this.thingList(new ThingList(tasks));
                    this.loaded(true);

                }).fail(() => {
                    this.error.publish("Error retrieving data from server");
                });
            });
        }

        // This operation is initiated by UI click. Collects all 
        // selected items and starts a long running operation.
        longOperation() {
            var checked = this.thingList().CheckedItems();
            
            checked.forEach(m => {
                m.OperationPending(true);
                m.IsChecked(false);

                // Create StartTaskCommand and send it
                this.bus.send({ id: m.Id });
            });

            this.info.publish("Processing " + checked.length + " items...");
        }
    }

    // Expose model to outside world for debugging purposes
    ThingListViewModel.instance = new ThingListViewModel();

    ThingListViewModel.instance.loaded.subscribe(() => {
        ko.applyBindings(ThingListViewModel.instance, document.getElementById("mytasks-layout"));
    });
}

// Extend typed jquery to understand hub
interface JQueryStatic {
    connection: any;
}

