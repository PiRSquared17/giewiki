How to set up giewiki either for local use _-or-_ hosted by Google at your own **appspot.com** (sub-)site.

## Software Requirements ##
Download the latest release (giewiki-1.x.zip) from here and unpack it (_or_ you can pull the bits directly from Subversion, if you have software to do so).
Either way, you will also need [Python 2.5](http://www.python.org/download/releases/2.5.4/) (2.6 or 2.7 seem to work as well) and the [App Engine SDK](http://code.google.com/appengine/downloads.html) from Google, both of which are also free (recent Mac or Linux boxes already have Python; if your're unsure, open a terminal window and type python [enter](enter.md)).

## Running giewiki locally ##

The App Engine SDK includes a simple web server together with the runtime libraries required to run a server on your own computer. Both the Windows and the Mac version also includes a graphical frontend called the **Google App Engine Launcher** for starting this web server. Simply fire it up and go to File - Add existing application. Point it to the folder containing the unpacked giewiki files. That will give you an entry in the list that it presents. Select this entry if it isn't already and click the **Run** button above. After a little while (during which Windows may prompt for your confirmation), the server should be ready and the **Browse** button gets enabled. Clicking that will fire up your default web browser with the address of your local server. If you are on Linux (or you want the server to start automatically), there is an alternative (command line) method which is described at http://code.google.com/appengine/docs/python/tools/devserver.html

## appspot.com hosting requirements ##

Unless you are setting it up on behalf of someone else, you will need to have your own (free) App Engine account. Go to https://appengine.google.com/start if you haven't one already - the process requires a phone capable of receiving text messages for the purpose of identification. You can create up to 10 apps using the same account, which each must be allocated an available appspot subdomain and be defined to use either the default high-replication datastore or the master-slave version (the choice cannot be changed). Currently, there seems to be an error in the process of index creation for giewiki when using the high-replication datastore, so using the master-slave datastore is recommended for now.

## Adaptation for hosting ##

To deploy giewiki to your own **appspot.com** site (**this is not neccessary to use it locally**), you have to first change one file, the one named **app.yaml** (a plaintext file that you can edit with notepad (on a Mac, use textedit), altering the first line:
```
application: giewiki-hrd
```
..to name your appspot subdomain in stead of `giewiki-hrd`.

## Deployment to appspot.com ##

Actual deployment can be performed using the **appcfg.py** script as described [here](http://code.google.com/appengine/docs/python/tools/uploadinganapp.html)

What that page doesn't say, however, is that on some platforms (Windows and Mac), you can launch the process directly from the above mentioned _Google App Engine Launcher_ (a GUI application that comes with the App Engine SDK). Just choose **File-Add Existing application** and select the unpacked giewiki folder, that you have modified as described above. Then it will be added to the (initially empty) list, and you can just select it and click the **deploy** button. The deployment process takes a couple of minutes, but there's an output window that shows you what's happening.

If this is _not_ the first version that you deploy to a particular site, you need to explicitly set the new version as the default, using the app engine dashboard at http://appengine.google.com (under Administration/Versions) - this is so that you can revert to the prior version, if needed.

There is currently no way to deploy content together with the code, but if you need to, read http://code.google.com/appengine/docs/python/tools/uploadingdata.html.

Beware that if you are upgrading an existing application, in some cases it may be a while before it is fully functional, because the server needs to rebuild the indexes which is a task that is queued for batch processing. Under heavy load it may take several hours, but you can monitor the process at appengine.google.com.