
# ipm package: splunk-service

## Overview

Splunk is a platform which helps user to have good analytics on their data. Sending the IoT device data to Splunk can help generate interesting analytics. This ipm-package helps user send data to Splunk.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

[![Live demonstration](https://img.youtube.com/vi/GCMGd9oun_Q/0.jpg)](https://www.youtube.com/watch?v=GCMGd9oun_Q)

## Setup

To setup this example the following 4 steps are required.

1. Setup on Splunk:

	Following steps are assuming user already has a account on Splunk cloud and has an app (default app can also be used), where the user wants http event data. There are various ways to get the data in Splunk-Cloud, this package focus on using [Http Event Collector](http://docs.splunk.com/Documentation/Splunk/latest/Data/AboutHEC) of Splunk.

	1. A HEC token needs to be created to allow the user to make http requests on Splunk. The process can be a little different depending on what type Splunk instance the user is running. If using Splunk Self-Service Cloud instance, click [here](http://docs.splunk.com/Documentation/Splunk/7.0.3/Data/UsetheHTTPEventCollector#Configure_HTTP_Event_Collector_on_self-service_Splunk_Cloud) to follow the steps to generate a HEC token. For more information, click [here](http://docs.splunk.com/Documentation/Splunk/latest/Data/AboutHEC).
	
	2. It is a good idea to create an index where user can store incoming events information, later on used for analytics purposes.

	3. The user can check the data received on Splunk Search, by querying `index="<index_name>"`.

	4. Create a dashboard on Splunk using the event information from devices(which is stored in the index on Splunk instance). As data sent from ClearBlade service is in JSON format, it can be easily received at Splunk and graphs/charts can be created using the fields. Splunks extracts it for the user. For detailed information, click [here](http://docs.splunk.com/Documentation/Splunk/latest/Viz/Overviewofdashboards)  

2. Setup on ClearBlade: 

	1.  Navigate to the Code / Libraries / SplunkConstants and provide your necessary Splunk account information. 
	
	2.  As a developer, browse to the service Code / Services / SplunkSetup
	    1.  Modify the constants at the top, if required
	    2.  Save and Test the service (This service only needs to be executed once)
	


## Usage

After setting up the system, the user can use the publish data to Splunk using the PublishToSplunk service. Once the data is available at Splunk, further analytics can be done.

To easily try our the Splunk integration, open the SplunkPublisher portal where you can simulate device data being published  

## Assets
### Code Libraries

`SplunkConstants` - This library holds the constants which are specific to the user and needs to be updated before attempting to use this package in your system.

### Code Services

`SplunkSetup` - a setup service that creates users and ensures all constants are set.  This service should only be run once.

`SplunkPublishToCloud` - a service which published data to Splunk Cloud, the data is the mqtt message payload, which it is subsrcibed to. 

### Triggers
`SplunkOnDataReceive` - This trigger activates when data is published on the _deviceData_ message topic. It triggers _SplunkPublishToCloud_ service to publish the data on the message topic.

### Portals

`SplunkPublisher` -  It's a demo portal, which allows user to mock up devices and send data to Splunk. It can be customized according to users needs. 
