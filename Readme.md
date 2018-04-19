
# ipm package: splunk-service

## Overview

Splunk is a platform which helps user to have good analytics on their data. Sending the IoT device data to Splunk can help generate interesting analytics. This ipm-package helps user send data to Splunk.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## Setup

To setup this example the following 4 steps are required.

1. Setup on Splunk:

	1. Create a HEC token on Splunk to allow you to make http requests on Splunk. The process can be a little different depending on what type Splunk instance the user is running. For more information, click [here](http://dev.splunk.com/view/event-collector/SP-CAAAE6M)
	
	2. A index needs to be created which lets you store incoming events information, which is later on used for analytics purposes.


2. Setup on ClearBlade: 

	1.  Navigate to the Code / Libraries / ConstantsSplunk and provide your necessary Splunk account information. 
	
	2.  As a developer, browse to the service Code / Services / SetupSplunk
	    1.  Modify the constants at the top
	    2.  Save and Test the service (This service only needs to be executed once)
	


## Usage

After setting up the system, the user can use the publish data to Splunk using the publish to Splunk service. Once the data is available at Splunk, further analytics can be done. 

### Code Services

SetupSplunk - a setup service that creates users and ensures all constants are set.  This service should only be run once.

PublishToSplunkCloud - a service which published data to Splunk Cloud, the data is the mqtt message payload, which it is subsrcibed to. 

### Code Libraries

### Portals
Splunk_publisher: It's a demo portal, which allows user to mock up devices and send data to Splunk. It can be customized according to users needs. 

### Collections

### ...

## Thank you

Powered by ClearBlade Enterprise IoT Platform: [https://platform.clearblade.com](https://platform.clearblade.com)
