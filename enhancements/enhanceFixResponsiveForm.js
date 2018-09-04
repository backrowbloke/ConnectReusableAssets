
(function ($) {

    var keyCodes = {
        BACKSPACE: 8,
        ENTER: 13,
        CTRL: 17,
        ESCAPE: 27,
        SPACE: 32,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
    };

    var inputOffset = 20;

    $.widget("ui.itempicker", {

        options: {
            itemAdded: $.noop,
            itemRemoved: $.noop,
            source: $.noop,
            getItemData: function (data) { return data; },
            renderAutocompleteItem: null,
            defaultItems: null,
            appendTo: null
        },

        //properties
        $container: null,
        $input: null,
        $source: null,
        $clip: null,
        $selectedItem: null,
        width: 40,
        scrollHeight: 0,
        maxWidth: false,
        sbWidth: 0,
        disabled: false,

        _create: function () {
            var self = this;
            var o = self.options;
            self.$source = self.element;
            self.$source.wrap("<div class='ip-container' />");
            self.$container = self.$source.parent();
            self.width = self.$container.width();
            //self.$container.width(self.width);
            self.$source.hide();
            self.$container.uniqueId();

            self.$clip = $("<input class='ip-clip' tabindex='-1' aria-hidden='true'></input>").appendTo(self.$container);
            self.$input = $("<textarea class='ip-input' rows='1'></textarea>").appendTo(self.$container);

            self.$input.width(self.width - inputOffset);
            self.maxWidth = true;
            self.scrollHeight = self.$input.get(0).scrollHeight;

            //calculate the system scrollbar width
            var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div></div>');
            $('body').append(div);
            var w1 = $('div', div).innerWidth();
            div.css('overflow-y', 'auto');
            var w2 = $('div', div).innerWidth();
            $(div).remove();
            self.sbWidth = (w1 - w2);

            self.$container.click(function () {
                self.$input.focus();
            });

            self.$input.keydown(function (event) {
                self._$input_keydown(self, event);
            });

            self.$input.keyup(function () {
                if (self.maxWidth) return;
                var newHeight = self.$input.get(0).scrollHeight;
                if (newHeight > self.scrollHeight) {
                    self.$input.width(self.width - inputOffset);
                    self.maxWidth = true;
                }
            });

            self.$input.keypress(function (event) {
                if (event.keyCode == keyCodes.ENTER) {
                    event.preventDefault();
                }
            });

            self.$input.focus(function () {
                self.$container.addClass('ip-container-focus');
            });

            self.$input.focusout(function () {
                self.$container.removeClass('ip-container-focus');
            });

            self.$clip.focusout(function () {
                self.$container.find(".ip-item").attr('class', 'ip-item');
            });

            self.$clip.keydown(function (event) {
                self._$clip_keydown(self, event);
            });

            self.$clip.bind('cut', function () {
                self._removeItem(self.$selectedItem);
            });

            //setup autocomplete -- test
            var ac = self.$input.autocomplete({
                source: self.options.source,
                minLength: 2,
                autoFocus: true,
                select: function (event, ui) {
                    if (ui.item.id === "NoResults") {
                        event.preventDefault();
                        return false;
                    }
                    self._addItem(ui.item);
                    return false;
                },
                focus: function (event, ui) {
                    if (ui.item.id === "NoResults") {
                        event.preventDefault();
                        return false;
                    }
                },
                position: {
                    of: "#" + self.$container.attr('id'),
                    my: "left top",
                    at: "left bottom"
                },
                appendTo: self.options.appendTo
        });

            if (typeof (self.options.renderAutocompleteItem) == "function")
                ac.data("ui-autocomplete")._renderItem = self.options.renderAutocompleteItem;

            ac.data("ui-autocomplete")._resizeMenu = function () {
                var ul = this.menu.element;
                var maxWidth = 450;
                if (window.innerWidth > 580) {               
	              }
	              else {
	              	maxWidth = window.innerWidth - 75;
	              }
	              ul.outerWidth(maxWidth);
            };

            //populate default items
            if (self.options.defaultItems) {
                for (var i = 0; i < self.options.defaultItems.length; i++) {
                    self._addItem(self.options.defaultItems[i]);
                }
            }

        },

        _addItem: function (data) {
            var self = this;

            var val = self.options.getItemData(data);

            var value = val.value || val;
            var label = val.label || value;
            var tooltip = val.tooltip;

            var tmpl = "<div class='ip-item' data-val='" + value + "'><span><div class='ip-item-content'>" + label + "</div><div class='ip-close'></div></span></div>";
            var item = $(tmpl).insertBefore(self.$input);

            $.data(item[0], 'data', val);

            if (tooltip && tooltip.length && tooltip.length > 0)
                item.attr('Title', tooltip);

            self.$input.val("");
            self._updatePosition();

            item.click(function () {
                self._selectItem(item);
                return false;
            });

            item.find('.ip-close').click(function () {
                self._removeItem(item);
                self.$input.focus();
            });

            //append the value to source
            self.$source.val(self.$source.val() + value + ';');

            self.options.itemAdded();

            self.$input.focus();
        },

        _selectItem: function ($item) {
            var self = this;
            self.$selectedItem = $item;
            self.$clip.val($item.attr('data-val'));
            self.$container.find(".ip-item").attr('class', 'ip-item');

            setTimeout(function () {
                self.$clip.select();
                self.$clip.focus();

                if (self.disabled)
                    return;

                $item.addClass('selected');
            }, 1);
        },

        _removeItem: function ($item) {
            var self = this;

            if (self.disabled)
                return;

            $item.remove();
            self._updatePosition();
            //update text;
            var value = '';
            var items = self.$container.find('.ip-item');
            for (var i = 0; i < items.length; i++)
                value += $(items[i]).attr('data-val') + ';';
            self.$source.val(value);

            self.options.itemRemoved();
        },

        _updatePosition: function () {
            var self = this;
            //calcualte the size of the textarea
            var item = self.$input.prev('.ip-item');
            if (item.length == 0) {
                //if there are no items, size it to the max possible
                if (!self.maxWidth) {
                    self.$input.width(self.width - inputOffset);
                    self.maxWidth = true;
                }
                return;
            }
            var offset = item.position().left + item.width();
            var w = self.width - offset;

            //check if scrollbars are present
            if (self.$container.get(0).scrollHeight > self.$container.get(0).clientHeight)
                w -= self.sbWidth;

            self.maxWidth = false;
            if (w < 50) {
                w = self.width;
                self.maxWidth = true;
            }
            self.$input.width(w - inputOffset);

            self.$container.scrollTop(self.$container[0].scrollHeight);
        },

        getInputValue: function () {
            var self = this;
            return self.$input.val();
        },

        setInputValue: function (value) {
            var self = this;
            self.$input.val(value);
        },

        _$clip_keydown: function (self, event) {
            switch (event.keyCode) {

                case keyCodes.LEFT_ARROW:
                    event.stopPropagation();
                    var previous = self.$selectedItem.prev('.ip-item');
                    if (previous.length > 0) {
                        self._selectItem(previous);
                    } else {
                        setTimeout(function () {
                            self.$clip.select();
                            self.$clip.focus();
                        }, 1);
                    }
                    break;

                case keyCodes.RIGHT_ARROW:
                    var next = self.$selectedItem.next('.ip-item');
                    if (next.length > 0) {
                        self._selectItem(next);
                    } else {
                        self.$input.focus();
                    }
                    break;

                case keyCodes.DELETE:
                case keyCodes.BACKSPACE:
                    self._removeItem(self.$selectedItem);
                    break;
            }
        },

        _$input_keydown: function (self, event) {
            if (self.$input.val().length > 0) return;

            switch (event.keyCode) {
                case keyCodes.BACKSPACE:
                    var prev = self.$input.prev('.ip-item');
                    if (prev.length > 0) self._removeItem(prev);
                    break;

                case keyCodes.LEFT_ARROW:
                    var prev = self.$input.prev('.ip-item');
                    if (prev.length > 0) self._selectItem(prev);
                    break;
            }

        },

        _setOption: function (key, value) {
            if (key === "disabled") {
                value ? this._disable() : this._enable();
            }
            $.Widget.prototype._setOption.apply(this, arguments);
        },

        _enable: function () {
            var self = this;
            self.disabled = false;

            self.$container.removeClass('ip-disabled');

            self._updatePosition();
        },

        _disable: function () {
            var self = this;
            self.disabled = true;

            if (self.$container.find('.ip-item').length == 0) {
                var height = self.$container.height();
                self.$container.css('min-height', height + 'px');
            }
            self.$container.addClass('ip-disabled');
        },
    });

})(NWF$);
