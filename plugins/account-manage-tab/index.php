<?php

class AccountManageTabPlugin extends \RainLoop\Plugins\AbstractPlugin
{
	/**
	 * @return void
	 */
	public function Init()
	{
		$this->UseLangs(true); // start use langs folder

		$this->addJs('js/AccountManageTab.js', true); // add js file

		$this->addAjaxHook('AjaxGetAccountManageData', 'AjaxGetAccountManageData');
		$this->addAjaxHook('AjaxSaveAccountManageData', 'AjaxSaveAccountManageData');
		$this->addAjaxHook('AjaxGetAllAccounts', 'AjaxGetAllAccounts');

		$this->addTemplate('templates/PluginAccountManageTab.html', true);
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

	public function getProvideStorage()
	{
		$oDriver = new \RainLoop\Providers\Storage\FileStorage(
						APP_PRIVATE_DATA.'storage', 'storage-local' === 'storage-local');
		$this->oLocalStorageProvider = new \RainLoop\Providers\Storage(
					$oDriver);
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

	public function AjaxGetAllAccounts()
	{
		$this->getProvideStorage();
		\RainLoop\ChromePhp::log('999999999999999');
		$aEmail = $this->oLocalStorageProvider->GetAllAccounts();
		\RainLoop\ChromePhp::log('000000000000000');
		// $aEmail = array("123@qq.com", "234@qq.com", "344@qq.com");
		// $aEmail[] = '1234@qq.com';
		// \array_push($aEmail, '123@qq.com');
		\sleep(1);
		return $this->ajaxResponse(__FUNCTION__, array(
			'AccountEmail' => $aEmail));
	}

}

