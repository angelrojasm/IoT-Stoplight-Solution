# IoT-Stoplight-Solution

Sample IoT simulation solution for managing traffic light states and waiting time for pedestrians. Utilizes AWS IoT Core for MQTT messaging between components

## Getting Started

After cloning the repository into your machine, navigate to the root of the project and then run the following command:

### `yarn install`

in order to install all of the corresponding packages.

After installing the packages, head on the `packages/server` folder and rename the file called `.env.example` to `.env`.

Afterwards, fill in the `accessKeyID`, `secretKey`, and `region` variables with your own AWS user keys.

## Running the App

After you've finished setting everything up, all you need to do is to run:

### `yarn dev`

in order to concurrently run both the server and the client.
