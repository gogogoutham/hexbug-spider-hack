function SpiderBatchController(firebaseUrl) {
    this.firebaseUrl = firebaseUrl;
    this.impAgents = [];
    this.instructions = [];
}

SpiderBatchController.prototype = {
    constructor : SpiderBatchController,
    
    //Register a new imp agent
    addImpAgent : function(agentId) {
        if (this.impAgents.indexOf(agentId) < 0 ) {
            this.impAgents[this.impAgents.length] = agentId;
        }
        
    },

    //Adds a new instruction by issuing specific commands for one or more agents with a common duration across all commands
    addInstruction : function(agentCommands, duration) {
        this.instructions[this.instructions.length] = {
            agentCommands : agentCommands,
            duration : duration
        };
    },

    //Adds a new instruction by issuing the same command to *every* register imp agent
    addUniformInstruction : function (agentCommand, duration) {
        agentCommands = {};
        for (var i in this.impAgents) {
            agentCommands[this.impAgents[i]] = agentCommand;
        }
        this.addInstruction(agentCommands, duration);
    },

    //Executes command sets in the specified sequence with the specified durations
    execute : function(offset) {
        if (typeof offset == 'undefined') {
            offset = 0;
        }
        if (offset == this.instructions.length) {
            return true;
        }
        else {
            console.log("Executing Command Set " + offset);
            var firebaseRef = new Firebase(this.firebaseUrl);
            var _this = this;
            agentCommands = this.instructions[offset].agentCommands;
                firebaseRef.set(agentCommands);
                window.setTimeout(function () { 
                    firebaseRef.set(invertCommands(agentCommands));
                    _this.execute(offset+1);
                }, this.instructions[offset].duration);
        }
    }
};

// Method to reverse commands on transition to the next command set
function invertCommands() {
    var invertedCommands = {};
    for (var agent in agentCommands) {
        invertedCommand = {};
        for (var action in agentCommands[agent]) {
            invertedCommand[action] = 1 - agentCommands[agent][action];
        }
        invertedCommands[agent] = invertedCommand;
    }
    return invertedCommands;
}


// Example Spider Dance; Change firebase URL and agent IDs to match your own configuration

var sbc = new SpiderBatchController('https://[[my-firebase]].firebaseio-demo.com/');

sbc.addImpAgent('[[my-agent-id-1]]');
sbc.addImpAgent('[[my-agent-id-2]]');

fullRotationTime = 2350; //Measured amount of time (in ms) for a 360 degree rotation via the left and right turn instructions
sbc.addUniformInstruction( {'moveForward' : 0 }, 4000);
sbc.addInstruction( {
    'pOSOc0i065ih' : { 'turnRight' : 0, 'moveBackward' : 0 },
    'vPZPaw3mCHDS' : { 'turnLeft' : 0,  'moveBackward' : 0 }
}, 3000 );
sbc.addUniformInstruction( {'moveForward' : 0 }, 2000);
sbc.addUniformInstruction( {'moveBackward' : 0 }, 2000);
sbc.addInstruction( {
    'pOSOc0i065ih' : { 'turnRight' : 0},
    'vPZPaw3mCHDS' : { 'turnLeft' : 0}
}, 3*fullRotationTime/4 );
sbc.addUniformInstruction( {'moveBackward' : 0 }, 4000);
sbc.execute();


// Establish keyboard controls for two spider remotes

var baseUrlA = "https://led-base.firebaseio-demo.com/pOSOc0i065ih/";
var leftRefA = new Firebase(baseUrlA + 'turnLeft/');
var upRefA = new Firebase(baseUrlA + 'moveForward/');
var rightRefA = new Firebase(baseUrlA + 'turnRight/');
var downRefA = new Firebase(baseUrlA + 'moveBackward/');

var baseUrlB = "https://led-base.firebaseio-demo.com/vPZPaw3mCHDS/";
var leftRefB = new Firebase(baseUrlB + 'turnLeft/');
var upRefB = new Firebase(baseUrlB + 'moveForward/');
var rightRefB = new Firebase(baseUrlB + 'turnRight/');
var downRefB = new Firebase(baseUrlB + 'moveBackward/');

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      leftRefA.set(0);
    break;
    case 38: // Up
      upRefA.set(0);
    break;

    case 39: // Right
      rightRefA.set(0);
    break;

    case 40: // Down
      downRefA.set(0);
    break;

    case 65: // Left -> a
      leftRefB.set(0);
    break;
    case 87: // Up -> w
      upRefB.set(0);
    break;

    case 68: // Right -> d
      rightRefB.set(0);
    break;

    case 83: // Down -> 
      downRefB.set(0);
    break;
  }
}, false);


window.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      leftRefA.set(1);
    break;
    case 38: // Up
      upRefA.set(1);
    break;

    case 39: // Right
      rightRefA.set(1);
    break;

    case 40: // Down
      downRefA.set(1);
    break;

    case 65: // Left -> a
      leftRefB.set(1);
    break;
    case 87: // Up -> w
      upRefB.set(1);
    break;

    case 68: // Right -> d
      rightRefB.set(1);
    break;

    case 83: // Down -> s
      downRefB.set(1);
    break;
  }
}, false);