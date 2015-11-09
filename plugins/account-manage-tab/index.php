<?php

class AccountManageTabPlugin extends \RainLoop\Plugins\AbstractPlugin
{
	/**
	 * @return void
	 */
	public function Init()
	{
		$this->UseLangs(true); // start use langs folder

		$this->addJs('js/AccountManageTab.js'); // add js file

		$this->addAjaxHook('AjaxGetAccountManageData', 'AjaxGetAccountManageData');
		$this->addAjaxHook('AjaxSaveAccountManageData', 'AjaxSaveAccountManageData');

		$this->addTemplate('templates/PluginAccountManageTab.html');
	}

	/**
	 * @return array
	 */
	public function AjaxGetAccountManageData()
	{
		$aSettings = $this->getUserSettings();

		$sUserFacebook = isset($aSettings['UserFacebook']) ? $aSettings['UserFacebook'] : '';
		$sUserSkype = isset($aSettings['UserSkype']) ? $aSettings['UserSkype'] : '';

		// or get user's data from your custom storage ( DB / LDAP / ... ).

		\sleep(1);
		return $this->ajaxResponse(__FUNCTION__, array(
			'UserFacebook' => $sUserFacebook,
			'UserSkype' => $sUserSkype
		));
	}

	/**
	 * @return array
	 */
	public function AjaxSaveAccountManageData()
	{
		$sUserFacebook = $this->ajaxParam('UserFacebook');
		$sUserSkype = $this->ajaxParam('UserSkype');

		// or put user's data to your custom storage ( DB / LDAP / ... ).

		\sleep(1);
		return $this->ajaxResponse(__FUNCTION__, $this->saveUserSettings(array(
			'UserFacebook' => $sUserFacebook,
			'UserSkype' => $sUserSkype
		)));
	}

}

