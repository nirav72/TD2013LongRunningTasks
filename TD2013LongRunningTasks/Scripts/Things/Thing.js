var Things;
(function (Things) {
    var Thing = (function () {
        function Thing(data) {
            this.data = data;
            this.IsSelected = ko.observable(false);
            this.IsChecked = ko.observable(false);
            this.OperationPending = ko.observable(false);
            this.ErrorMessage = ko.observable();
            var self = this;
            self.Id = data.Id;
            self.Title = ko.observable(data.Title);
            self.Operations = ko.observableArray(data.Operations);
        }
        return Thing;
    })();
    Things.Thing = Thing;    
})(Things || (Things = {}));
