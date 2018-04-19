function publishToSplunkCloud(req, resp){
    var requestObject = Requests();
    var splunk_url = "https://input-"+SPLUNK_HOSTNAME+":"+PORTNO+"/services/collector";
    var options = {
        headers:{
            "Authorization":SPLUNK_KEY,
            "Content-Type": "application/json"
        },
        url: splunk_url,
        body: {
            "event": JSON.parse(req.params.body),
            "sourcetype":"_json"
        },
        strictSSL:false 
    };
    log(JSON.stringify(options))
    requestObject.post(options,function(err, r){
        if(err){
            log("response "+err);
            resp.error(err);
        }
        else{
            log("response "+r);
            resp.success(r);
        }
    });
}