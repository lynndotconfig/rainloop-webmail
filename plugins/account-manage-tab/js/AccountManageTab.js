
(function () {

	'user strict';

	// var
	// 	window = require('window'),
	// 	_ = require('_'),
	// 	ko = require('ko'),

	// 	Enums = require('Common/Enums'),
	// 	Links = require('Common/Links'),

	// 	AccountStore = require('Stores/User/Account'),
	// 	IdentityStore = require('Stores/User/Identity'),

	// 	Settings = require('Storage/Settings'),
	// 	Remote = require('Remote/User/Ajax')
	/**
	 * @constructor
	 */
	function AccountManageTab()
	{
		this.userSkype = ko.observable('');
		this.userFacebook = ko.observable('');
		this.sEmail = ko.observable('');
		this.accountEmail = ko.observableArray([]);

		// this.accountEmail = ko.observable('');
		// this.email = ko.computed( function () {
		// 	return this.accountEmail()[0];
		// }, this)

		// this.accountEmail('123@qq.com','234@qq.com');

		this.loading = ko.observable(false);
		this.saving = ko.observable(false);

		this.savingOrLoading = ko.computed(function () {
			return this.loading() || this.saving();
		}, this);


		//add from user account view
		// this.allowAdditionalAccount = Settings.capa(Enums.Capa.AdditionalAccounts);
		// this.allowIdentities = Settings.capa(Enums.Capa.Identities);

		// this.accounts = AccountStore.accounts;
		// this.identities = IdentityStore.identities;

		// this.accountForDeletion = ko.observable(null).deleteAccessHelper();
		// this.identityForDeletion = ko.observable(null).deleteAccessHelper();

	}

	AccountManageTab.prototype.addNewAccount = function ()
	{
		alert("new popup");
		// require('Knoin/Knoin').showScreenPopup(require('View/Popup/Account'));
	}

	AccountManageTab.prototype.AccountManageAjaxSaveData = function ()
	{
		var self = this;

		if (this.saving())
		{
			return false;
		}

		this.saving(true);

		window.rl.pluginRemoteRequest(function (sResult, oData) {

			self.saving(false);

			if (window.rl.Enums.StorageResultType.Success === sResult && oData && oData.Result)
			{
				// true
			}
			else
			{
				// false
			}

		}, 'AjaxSaveAccountManageData', {
			'UserSkype': this.userSkype(),
			'UserFacebook': this.userFacebook()
		});
	};

	AccountManageTab.prototype.editAccount = function(oAccountItem)
	{
		if (oAccountItem && oAccountItem.canBeEdit())
		{
			alert('edit additional account')
		}
	}

	AccountManageTab.prototype.onBuild = function () // special function
	{
		var self = this;

		this.loading(true);

		window.rl.pluginRemoteRequest(function (sResult, oData) {

			self.loading(false);

			if (window.rl.Enums.StorageResultType.Success === sResult && oData && oData.Result)
			{
				self.userSkype(oData.Result.UserSkype || '');
				self.userFacebook(oData.Result.UserFacebook || '');
			}

		}, 'AjaxGetAccountManageData');		
	};

	AccountManageTab.prototype.getAllAccount = function ()
	{		
		alert('get all account');

		var self = this;

		this.loading(true);

		window.rl.pluginRemoteRequest(function (sResult, oData) {
			self.loading(false);

			if (window.rl.Enums.StorageResultType.Success == sResult && oData && oData.Result)
			{
				var aEmails = [];
				// var sEmails = '';

				// aEmails = oData.Result.AccountEmail;

				// sEmails = aEmails[0];

				// alert(sEmails);

				self.accountEmail(oData.Result.AccountEmail);
				console.log(self.accountEmail);
			}

		}, 'AjaxGetAllAccounts');

		oDom
			.on('click', '.accounts-list .account-item .e-action', function () {
				var oAccountItem = ko.dataFor(this);
				if (oAccountItem)
				{
					self.editAccount(oAccountItem);
				}
			})

	}

	// window.rl.addSettingsViewModel(AccountManageTab, 'PluginAccountManageTab',
	// 	'SETTINGS_ACCOUNT_PLUGIN/TAB_NAME', 'Account');
	window.rl.addSettingsViewModelForAdmin(AccountManageTab, 'PluginAccountManageTab',
		'SETTINGS_ACCOUNT_PLUGIN/TAB_NAME', 'Account');
	
}());