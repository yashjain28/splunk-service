function testingSplunk(req, resp){
    log(JSON.stringify(req));
    
    var requestObject = Requests();
    var options = {
        headers:{
            "Authorization":"Splunk 261cdb18-4b63-46c0-8c60-8d18a3d42222",
                "Content-Type": "application/json"
        },
        url: "https://input-prd-p-jcxp2l4lk9pj.cloud.splunk.com:8088/services/collector",
       body: {"hello": "hello"},
       strictSSL:false 
    };
    log(JSON.stringify(options));
    requestObject.post(options,function(err, r){
        if(err){
            log("Error Uploading to Cloud: " + err);
            resp.error(err);
        }
        else{
            log("success" + r);
            resp.success(r);
        }
    });
}