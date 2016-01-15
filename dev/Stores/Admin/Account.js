
(function () {

    'use strict';

    var
        _ = require('_'),
        ko = require('ko'),

        Settings = require('Storage/Settings')
    ;

    /**
     * @constructor
     */
    function AccountAdminStore()
    {
        this.email = ko.observable(''),
        this.parentEmail = ko.observable(''),

        this.signature = ko.observable(''),

        this.accounts = ko.observable(''),
        this.accounts = ko.observableArray([]);
        this.accounts.loading = ko.observable(false).extend({'throttle':100});

        this.computers();
    }

    AccountAdminStore.prototype.computers = function ()
    {
        this.accountsEmail = ko.computed(function () {
            return _.compact(_.map(this.accounts(), function (oItem){
                return oItem ? oItem.email : null;
            }));
        }, this);

        this.accountsUnreadCount = ko.computed(function () {
            var iResult = 0;
            return iResult;
        }, this);
    };
    

    AccountAdminStore.prototype.populate = function ()
    {
        this.email('admin@qq.com'); // get for all account
        this.parentEmail('');// get for all account
    }

    AccountAdminStore.prototype.isRootAccount = function ()
    {
        return '' === this.parentEmail();
    }

    module.exports = new AccountAdminStore();

}());
