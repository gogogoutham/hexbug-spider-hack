//Map hexbug spider remote controller actions to hardware pins; this will vary depending on your configuration
moveForward <- hardware.pin1;
moveForward.configure(DIGITAL_OUT_OD);
moveForward.write(1);

moveBackward <- hardware.pin2;
moveBackward.configure(DIGITAL_OUT_OD);
moveBackward.write(1);

turnLeft <- hardware.pin5;
turnLeft.configure(DIGITAL_OUT_OD);
turnLeft.write(1);

turnRight <- hardware.pin7;
turnRight.configure(DIGITAL_OUT_OD);
turnRight.write(1);

//Register event handlers for actions passed from the agent
agent.on("moveForward", function(state) {
    try {
        server.log("Received the following state for moveForward " + state);
        moveForward.write(state);
    } catch (ex) {
        server.log("error setting moveForward: " + ex);
    }
});

agent.on("moveBackward", function(state) {
    try {
        server.log("Received the following state for moveBackward " + state);
        moveBackward.write(state);
    } catch (ex) {
        server.log("error setting moveBackward: " + ex);
    }
});

agent.on("turnLeft", function(state) {
    try {
        server.log("Received the following state for turnLeft " + state);
        turnLeft.write(state);
    } catch (ex) {
        server.log("error setting turnLeft: " + ex);
    }
});

agent.on("turnRight", function(state) {
    try {
        server.log("Received the following state for turnRight " + state);
        turnRight.write(state);
    } catch (ex) {
        server.log("error setting turnRight: " + ex);
    }
});