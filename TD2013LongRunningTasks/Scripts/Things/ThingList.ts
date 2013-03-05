/// <reference path="../jquery.d.ts" />
/// <reference path="../knockout-2.2.d.ts" />
/// <reference path="Dtos.ts" />
/// <reference path="Thing.ts" />
interface IThingList {
    Things: KnockoutObservableArray;
    CheckedCount: KnockoutComputed;
    CheckedItems: KnockoutComputed;
    SelectedItem: KnockoutObservableAny;
}

module Things {
    export class ThingList implements IThingList  {
        // Persisted properties
        Things: KnockoutObservableArray;

        // Computed properties
        CheckedItems: KnockoutComputed;
        CheckedCount: KnockoutComputed;
        SelectedItem: KnockoutObservableAny;

        constructor (public data: IThingListDto) { 
            var mapped = <any>$.map(data || [], function (thingDto: IThingDto) {
                return new Thing(thingDto);
            });

            this.Things = ko.observableArray(mapped);

            // Mark first as selected
            this.Things()[0].IsSelected(true);
            this.SelectedItem = ko.observable(this.Things()[0]);

            this.CheckedItems = ko.computed(() => {
                return ko.utils.arrayFilter(this.Things(), item => {
                    return item.IsChecked();
                });
            });

            this.CheckedCount = ko.computed(() =>
            {
                return this.CheckedItems().length;
            });

            // As select method is called directly from UI binding, it 
            // does not have correct context. Force context with bind.
            this.select = this.selectInternal.bind(this);
        }

        getItem(id: string) {
            var found;
            this.Things().forEach(t => {
                if (t.Id === id) {
                    found = t;
                    return false;
                }
            });

            return found;
        }

        replace(item: IThing) {
            this.Things().forEach(t => {
                if (t.Id === item.Id) {
                    this.Things.replace(t, item);

                    // Persist UI properties
                    item.IsSelected(t.IsSelected());
                    item.IsChecked(t.IsChecked());

                    // Force UI re-rendering if this item is on view
                    if (item.IsSelected()) {
                        this.SelectedItem(item);
                    }

                    return false;
                }
            });
        }

        selectInternal(item: IThing) {
            // Only one item can be selected at a time
            this.Things().forEach(t => {
                var b = t.Id === item.Id;
                t.IsSelected(b);

                if (b) {
                    this.SelectedItem(t);
                }
            });
        }

        select: (item: IThing) => void;
    }
}