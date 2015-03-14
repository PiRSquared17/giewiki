## 1.0.1 ##

Initial release.

## 1.0.2 ##

Mostly bugfixes.

## 1.1.0 ##

  * Added automatic links to other pages as well as to tiddlers.
  * Added RSS support.

## 1.2.0 ##

  * ShadowTiddlerTag
  * IncludesTag
  * RecentComments
  * ServerMacros
  * HttpMethods
  * ExportImport tiddlywiki

## 1.3.beta ##

  * edit locking, permanent tiddler locking
  * backup/restore
  * subdomains (separate or combined content, publising from there)
  * PluginManager
  * support for Plugins that add to config.shadowTiddlers

## 1.3.1 ##

  * Import tiddlers from files or URL's

## 1.4.1 ##

  * User profiles
  * Tiddler diff
  * Page properties lists imported content
  * Read-only view options: Access to prior versions, Show view button

## 1.5.1 ##

  * Allow reverting edits
  * Allow setting a prior version to be the current version
  * Allow deleting prior versions

## 1.6 ##

  * Introduces PageTemplates & tiddler libraries
  * Allow page-level tags

## 1.6.2 ##

Fixes 3 issues with the Import facility:
  * When import failed, it would not report the cause.
  * Pages that had `<br>` elements, like http://tiddlywiki.com/, would fail to import.
  * When no 'other..' source was defined in AdvancedOptions, it would prompt for a URL only the first time 'other..' was clicked.

## 1.7.0 ##

  * Allows subdomain wikis using app engine namespaces