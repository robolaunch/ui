"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-escape */
var child_process_1 = require("child_process");
var initialData = {
    robotId: 1,
    fleetId: 1,
    sensorId: 1,
    waypoint: {
        x: 1,
        y: 1,
        z: 0,
        yaw: 0.0,
    },
};
var barcodes = [];
function commandGenerator(commandData) {
    return "ros2 topic pub --once /all_barcodes std_msgs/msg/String '{\"data\": \"{\\\"robotId\\\": \\\"".concat(commandData.robotId || initialData.robotId, "\\\", \\\"fleetId\\\": \\\"").concat(commandData.fleetId || initialData.fleetId, "\\\", \\\"sensorId\\\": \\\"").concat(commandData.sensorId || initialData.sensorId, "\\\", \\\"barcode\\\": \\\"").concat(randomBarcodeGenerator(), "\\\", \\\"waypoint\\\": {\\\"x\\\": ").concat(commandData.x, ", \\\"y\\\": ").concat(commandData.y, ", \\\"z\\\": ").concat(commandData.z, ", \\\"yaw\\\": 0.0}}\"}'");
}
function randomBarcodeGenerator() {
    return Math.random().toString(36).substr(2, 8);
}
for (var x = 1; x < 13; x++) {
    for (var y = 1; y < 13; y++) {
        for (var z = 0; z < 6; z++) {
            var command = commandGenerator({
                x: initialData.waypoint.x + x,
                y: initialData.waypoint.y + y,
                z: initialData.waypoint.z + z,
            });
            barcodes.push(command);
        }
    }
}
function runCommands() {
    if (barcodes.length === 0) {
        console.log("All commands executed!");
        return;
    }
    var command = barcodes.shift();
    console.log("WORK:", command);
    (0, child_process_1.exec)(command, function (error, stdout, stderr) {
        if (error) {
            console.error("JSERR: ".concat(error.message));
            return;
        }
        if (stderr) {
            console.error("STDERR: ".concat(stderr));
            return;
        }
        console.log("STDOUT: ".concat(stdout));
    });
    setTimeout(runCommands, 250);
}
runCommands();
