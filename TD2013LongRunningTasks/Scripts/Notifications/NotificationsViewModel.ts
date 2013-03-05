/// <reference path="../jquery.d.ts" />
/// <reference path="../pubsub.ts" />
/// <reference path="../knockout-2.2.d.ts" />
/// <reference path="Settings.ts" />

module Notifications {
    // Prevent toastr typescript warnings
    interface toastr {
        // In reality these have more parameters, simplifying here
        error(s: string): any;
        warning(s: string): any;
        success(s: string): any;
    }

    declare var toastr: toastr;

    export class NotificationsViewModel {
        static instance: NotificationsViewModel;

        error: KnockoutObservableAny = ko.observable();
        warning: KnockoutObservableAny = ko.observable();
        success: KnockoutObservableAny = ko.observable();

        // Subscribe to queues
        errorQueue = $.Topic("message/error");
        warningQueue = $.Topic("message/warning");
        infoQueue = $.Topic("message/info");
        settingsQueue = $.Topic("message/settingsChanged");

        loaded: KnockoutObservableBool = ko.observable(false);

        constructor() {
            this.settingsQueue.subscribe(this.settingsChanged.bind(this));
            
            // Default settings, change these here until there will be an UI
            var s = new Settings();
            s.useLegacyMessages = false;
            s.useToasts = true;

            this.settingsQueue.publish(s);            
        }

        private settingsChanged(s: Settings) {
            // Clean up before registering anything new
            this.errorQueue.unsubscribe();
            this.warningQueue.unsubscribe();
            this.infoQueue.unsubscribe();

            // Register message handlers based on settings
            if (s.useLegacyMessages) {
                // Legacy messages change DOM elements directly
                this.errorQueue.subscribe(this.error);
                this.warningQueue.subscribe(this.warning);
                this.infoQueue.subscribe(this.success);
            }
            
            if (s.useToasts) {
                // Toasts use toastr library
                this.errorQueue.subscribe(toastr.error);
                this.warningQueue.subscribe(toastr.warning);
                this.infoQueue.subscribe(toastr.success);
            }
        }
    }

    // Expose model to outside world for debugging purposes
    NotificationsViewModel.instance = new NotificationsViewModel();
    ko.applyBindings(NotificationsViewModel.instance, document.getElementById("messages"));
    NotificationsViewModel.instance.loaded(true);
}