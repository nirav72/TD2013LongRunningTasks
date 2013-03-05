/// <reference path="../knockout-2.2.d.ts" />
/// <reference path="Dtos.ts" />
interface IThing {
    Id: any;
    Title: KnockoutObservableString;
    IsSelected: KnockoutObservableBool;
    IsChecked: KnockoutObservableBool;
    ErrorMessage: KnockoutObservableAny;
    OperationPending: KnockoutObservableBool;
    Operations: KnockoutObservableArray;
}

module Things {
    export class Thing implements IThing  {
        // Persisted properties
        Id: any;
        Title: KnockoutObservableString;
        Operations: KnockoutObservableArray;

        // Non-persisted properties
        IsSelected = ko.observable(false);
        IsChecked = ko.observable(false);
        OperationPending = ko.observable(false);
        ErrorMessage = ko.observable();

        // Constructor
        constructor (public data: IThingDto) { 
            var self = this;
            
            self.Id = data.Id;
            self.Title = ko.observable(data.Title);
            self.Operations = ko.observableArray(data.Operations);
        }
    }
}