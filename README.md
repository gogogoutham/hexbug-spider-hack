Hexbug Spider Hack
==================

This is hack that allows web-based control and movement scheduling / coordination of multiple [hex bug spiders](http://www.hexbug.com/mechanical/spider/) through the use of the [Electric Imp](http://electricimp.com/) and [Firebase](https://www.firebase.com/).


Architecture Overview
-------------

Our strategy here was to simply chain various pieces of technology. We removed the circuit board of a Hexbug Spider remote controller and connected various switches controlling the spider's movement to different pins on an Imp April development board, we configured the Imp device code to map agent instructions (in english) to different pin actions, we configured the agent to respond to those instructions based on streamed firebase updates, and we built client javascript code to update that firebase with relevant instructions in near real-time. Or semi-visually:

web-client --> firebase --> imp agent --> imp device --> hexbug spider remote controller --> hexbug spider

<h3> Hardware Side Notes </h3>

You can see our setup below - we used a small-bread board to connect an [April development board](http://devwiki.electricimp.com/doku.php?id=april) with a [Imp Dev Card](https://www.sparkfun.com/products/11395) to various jumper wires we'd soldered on to various end points of the circuit board. An overview of the Hexbug Spider Remote Controller's circuit board can be found [here](http://www.geotalisman.org/2012/10/30/hacking-hex-bug-spiders/).

<img src="https://raw.github.com/gseshadri/hexbug-spider-hack/master/img/hexbug-spider-remote-to-imp.jpg"/>

We actually did this twice, for two different remote controllers. Without hacking the hardware further, this was the effective maximum - the spider and its remote controller only support two distinct RF frequencies.

<h3> Software Side </h3>

We coded the interaction between the javascript client library, firebase, and the Imp Agent to allow for different, simultaneous command sets for each agent - in our setup, this allowed us to control each spider seperately and to schedule different movements for each spider that were executed simultaneously.

We also created a very basic javascript API for specfyfing scheduled movements across multiple devices. An example of usage can be found in web/scripts/hexbug-spider-controller.js.


Usage
-----

1. Please read through the code base to get an idea of what each component of this hack does before implementing.
1. Code in the imp/ folder must be deployed on each agent / device desired with some minor modificaitons (see next steps). We did this with two agents, each connected to a single device, but this can be done for an arbitrary number of agents mapped to an arbitrary set devices. Since the hexbug spiders and remote controllers can only be configured to communicate on two RF frequencies, one is effectively limited to two sets of independent movements for spiders in close proximity.
1. You must setup a firebase, choose agent IDs for each Imp agent you've connected, and enter this information into both the web-side javascript and the .nut files for each Imp agent. Instructions on where do this are in the code base.
1. You may need to adjust the Imp device code to match the way in which you wire the spiders' remote controls to the Imp.
1. Code in the web/ folder is meant to be deployed on a web-server. Doesn't really matter which server or where (so long as the server can access the internet)!


TODO
----
- Full user interface around creating coordinated dance schedules
- Seperation of dance scheduling user interface from web-based remote controller interface
- Recording of command sequences from remote controller interface for replay and mixing
- Determine from a hardware perspective if more than two RF frequencies can be used to control hexbug spiders


Acknowledgements
----------------

This hack was a collaborative effort of Yoni Feldman, Gideon Lee, and myself at an Electric Imp Hackathon. Special thanks to various folks at both Electric Imp and Firebase who gave us both ideas and assistance. The following resources were particularly helpful:

- [Matthew Haines' Electric Imp interface to the Firebase Streaming API](https://github.com/beardedinventor/ElectricImp-FirebaseIO)
- [Blog Entry on the Hacking the Hexbug Spider's Hardware](http://www.geotalisman.org/2012/10/30/hacking-hex-bug-spiders/
)
