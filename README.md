# webpack-express-riotjs

Bootstrap project for:

* Webpack
* Express
* RiotJS
* Flux like architecture with Alt
* Redis used as backend persistance

The main goal of this setup was to have an end to end setup (Riot <> Express <> Redis) whilst also utilizing the development features of Webpack.

There are a few examples of how to do this around, one is on the Webpack site itself.  I choose to start webpack inside a proxy that runs in front of express.  It proxies all webpack relate calls to webpack, and everything else through to express.  When you do the actual production build, you get all the webpack assets on the filessytem and express is accessed directly (no proxy).

This is still beta, and its not intended to show how to setup an Express application.

The Riot setup uses Alt for a flux like architecture, basicly I've just switched React out as the view.