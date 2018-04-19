

/**
 * 
 * This service trigger, when data is published on the deviceData message topic, more triggers can be added based on user's requirement
 * 
 * 
 * @param {Object} req
 * req.params.body = Payload from message topic, stringified JSON Ex: 
 *{
 *  "device": 3,
 *  "temperature": 74.1185302385636,
 *  "acceleration": 4.530383262419955,
 *  "uvlight": 223.5559071569079
 *}

 * @param {Object} resp
 * Response received from Splunk on successful execution 
 * {"text":"Success","code":0}
 *  
 */
function PublishToSplunkCloud(req, resp){
    var requestObject = Requests();
    var splunk_url = "https://input-"+SPLUNK_HOSTNAME+":"+PORTNO+"/services/collector";
    var options = {
        headers:{
            "Authorization":SPLUNK_KEY,
            "Content-Type": "application/json"
        },
        body: {
            "event": JSON.parse(req.params.body),
            "sourcetype":"_json"
        },
        url: splunk_url,
        strictSSL:false 
    };
    log(JSON.stringify(options))
    requestObject.post(options,function(err, r){
        if(err){
            //log("response "+err); //Uncomment for easier debugging
            resp.error(err);
        }
        else{
            //log("response "+r); //Uncomment for easier debugging
            resp.success(r);
        }
    });
}