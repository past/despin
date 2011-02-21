Despin
======

Despin is a text editor for programmers. It is based on Mozilla [Chromeless](http://mozillalabs.com/chromeless) and embeds the awesome [Ace](http://ace.ajax.org/) editor, providing traditional editor functionality for local files.

Prerequisites
-------------

You need to have Chromeless downloaded in order to run Despin. You can get it by typing the following command:

    git clone git://github.com/mozilla/chromeless.git

Download
--------

In order to download Despin you have to clone the repository and fetch the submodules:

    git clone git://github.com/past/despin.git
    git submodule update --init --recursive

Running Despin
--------------

If you downloaded chromeless and despin in sibling directories, you can run despin by typing the folowing command in the despin directory:

    ../chromeless/chromeless .

Otherwise you will have to substitute the full path to the chromeless script in your system in the command above.

License
-------

Despin is licensed under the standard Mozilla MPL/GPL/LGPL tri-license, same as Firefox.

