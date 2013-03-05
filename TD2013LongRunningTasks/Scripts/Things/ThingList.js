var Things;
(function (Things) {
    var ThingList = (function () {
        function ThingList(data) {
            this.data = data;
            var _this = this;
            var mapped = $.map(data || [], function (thingDto) {
                return new Things.Thing(thingDto);
            });
            this.Things = ko.observableArray(mapped);
            this.Things()[0].IsSelected(true);
            this.SelectedItem = ko.observable(this.Things()[0]);
            this.CheckedItems = ko.computed(function () {
                return ko.utils.arrayFilter(_this.Things(), function (item) {
                    return item.IsChecked();
                });
            });
            this.CheckedCount = ko.computed(function () {
                return _this.CheckedItems().length;
            });
            this.select = this.selectInternal.bind(this);
        }
        ThingList.prototype.getItem = function (id) {
            var found;
            this.Things().forEach(function (t) {
                if(t.Id === id) {
                    found = t;
                    return false;
                }
            });
            return found;
        };
        ThingList.prototype.replace = function (item) {
            var _this = this;
            this.Things().forEach(function (t) {
                if(t.Id === item.Id) {
                    _this.Things.replace(t, item);
                    item.IsSelected(t.IsSelected());
                    item.IsChecked(t.IsChecked());
                    if(item.IsSelected()) {
                        _this.SelectedItem(item);
                    }
                    return false;
                }
            });
        };
        ThingList.prototype.selectInternal = function (item) {
            var _this = this;
            this.Things().forEach(function (t) {
                var b = t.Id === item.Id;
                t.IsSelected(b);
                if(b) {
                    _this.SelectedItem(t);
                }
            });
        };
        return ThingList;
    })();
    Things.ThingList = ThingList;    
})(Things || (Things = {}));
