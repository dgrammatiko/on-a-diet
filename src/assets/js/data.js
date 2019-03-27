const dataScript = `<?php
defined('_JEXEC') or die('Restricted access');

use Joomla\\CMS\\Factory;

class plgSystemRemovefatInstallerScript {
  public function __construct(JAdapterInstance $adapter) {
    $this->minimumJoomla = '3.9';
    $this->minimumPhp = JOOMLA_MINIMUM_PHP;
  }
  public function install(JAdapterInstance $adapter) {
    $db = Factory::getDbo();

    /**{{replacement}}**/

    foreach ($useless as $element => $options ) {
      $query = $db->getQuery(true)
      ->update('#__extensions')
      ->set($db->qn('enabled') . ' = ' . (int) $options['enabled'])
      ->where('type = ' . $db->q($options['type']))
      ->where('name = ' . $db->q($element));

      switch ($options['type']) {
        case 'plugin':
          $query->where('folder = ' . $db->q($options['folder']));
          break;
        case 'language':
        case 'module':
        case 'template':
          $query->where('client_id = ' . (int) $options['client_id']);
          break;
        default:
        case 'library':
        case 'package':
        case 'component':
          break;
      }

      $db->setQuery($query);
      try { $db->execute(); } catch (\\Exception $e) { }
    }
  }
  public function postflight($type, $parent) {
    if ($type === 'install' || $type === 'discover_install') {
      $db = Factory::getDbo();

      $query = $db->getQuery(true)
      ->delete('#__extensions')
      ->where('type = ' . $db->q('plugin'))
      ->where('element = ' . $db->q('removefat'))
      ->where('folder = ' . $db->q('system'));

      $db->setQuery($query);

      try {
        $db->execute();
      } catch (\\Exception $e) { }

      if (is_dir(JPATH_ROOT . '/plugins/system/removefat')) {
        if (is_file(JPATH_ROOT . '/plugins/system/removefat/removefat.php')) {
          unlink(JPATH_ROOT . '/plugins/system/removefat/removefat.php');
        }
        if (is_file(JPATH_ROOT . '/plugins/system/removefat/removefat.xml')) {
          unlink(JPATH_ROOT . '/plugins/system/removefat/removefat.xml');
        }
        if (is_file(JPATH_ROOT . '/plugins/system/removefat/script.php')) {
          unlink(JPATH_ROOT . '/plugins/system/removefat/script.php');
        }
        rmdir(JPATH_ROOT . '/plugins/system/removefat');
      }
    }
  }
}
`;const dataMain = `<?php defined('_JEXEC') or die; class PlgSystemRemovefat extends JPlugin {}`;const dataXML = `<?xml version="1.0" encoding="utf-8"?>
<extension version="3.9" type="plugin" group="system" method="upgrade">
  <name>Remove FAT</name>
  <author>Dimitrios Grammatikogiannis</author>
  <creationDate>2019</creationDate>
  <copyright>Copyright (C) 2019 Dimitrios Grammatikogiannis. All rights reserved.</copyright>
  <license>GNU General Public License version 2 or later; see LICENSE.txt</license>
  <authorEmail>d.grammatiko@gmail.com</authorEmail>
  <authorUrl>https://dgrammatiko.online</authorUrl>
  <version>0.0.1</version>
  <description>Automagically disables what needs to be disabled</description>
  <scriptfile>script.php</scriptfile>
  <files>
    <filename plugin="removefat">removefat.php</filename>
  </files>
</extension>
`;export { dataScript, dataMain, dataXML };