# Nuxt shop with directus.io as a Headless CMS

A Nuxt store connected to a directus backend for full user control of their own data.

# License

[![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

This work is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg

# How to install this software.

Until a step-by-step wizard is configured to make it easier, all dependencies must be installed manually.

Feel free to help the project by packaging in a way that makes it easier for anyone.

## Installing MariaDB

If the artist does not opt for the community version of directus and wants to have full control of his data, he will need to install a MariaDB database on his own computer. To do this, you should follow the steps below:

1. Access the [MariaDB](https://mariadb.com/downloads/) website and download the latest version of the database for your operating system.
2. Run the downloaded installer.
3. Follow step by step the instructions of the installer. In case you are not sure what to change or what not to change, it is best to leave the default data.
4. When asked for username and password, choose the one you want. You can leave them by default, but it is important to remember them because they will be the ones you will have to put in the environment variable files of your applications.
5. For users unfamiliar with database management, we recommend leaving it as a service. This will avoid having to start it manually every time we need to access it.

## Installing Node

In order to use the npm package manager that will allow the artist to access everything locally, Node must be installed, following a few simple steps.

1. Go to [Node downloads](https://nodejs.org/es/download/) and download the Node.js installer on the desired operating system.
2. Execute the installer that we have downloaded from the web. Simply follow each of the steps. In the case of having doubts about some option that asks us, the best thing is to leave the option by default.
3. Once the installation is finished, we can go to our favorite terminal (if the user is in Windows and does not know the term, go to the main menu and look for "command prompt") and test that it has been installed correctly by typing the command `npm -v`.

## Nuxt config

If you want Nuxt to start correctly, we must rename the root file `.env.example` to `.env` and change the values inside with the web addresses that will be used when we have our web published (`NUXT_ENV_BASE_URL` and `NUXT_BASE_URL`), where our Directus is configured, to which we will connect (`DIRECTUS_BACKEND_URL`) and, if we want a store, the public key provided by the Stripe payment gateway in `STRIPE_PK`. Once this is done, we can start it with `npm run dev` or `npm run serve`

## Transpile your website

Once we have finished configuring our products, added the pages we want and we believe that we can upload the web so that customers can access, we must go to the folder where we have this project, access the frontend that is in the nuxt-frontend folder, open a command interface and run:

`npm run shop:generate`

This command will download all the necessary assets to generate the html web that we will be able to deploy in your favorite hosting. Also, if you want to deploy it in Netlify keep reading. It's easy peasy.

## Netlify deployment.

There are two ways in which it can be deployed on Netlify. One of them, which is usually used by people with more advanced knowledge, is to configure a pipeline through a git repository in which the platform itself reads and compiles. This is also how alternatives such as Vercel work.

But Netlify has a second option, which would be useful to all those for whom reading the previous paragraph may have caused migraines. Once the website has been transpiled, you can simply drag the resulting directory onto the Netlify website and it will be automatically deployed. To do this, there are only two steps to follow.

The first step is to create a new site, choosing the option "deploy manually" from the drop-down menu.

Once this is done, we only have to drag the resulting directory to the place indicated on the website.

And now all you have to do is wait. If for whatever reason it takes a long time to deploy (more than a few minutes), **you should check that any browser extension is not blocking the upload**, such as, for example, an adblocker. If this happens, just cancel, disable the extension and re-upload the directory.

Once it has been deployed, you will be able to access your site.
