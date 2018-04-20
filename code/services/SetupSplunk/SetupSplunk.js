function SetupSplunk(req, resp){
    var portalUserPassword = "clearblade";         // change this to something unique
    
    var response = {
        err:false,
        messages:[]
    };

    var new_user_id = "";
    var systemRoles =[];
    
    var getSystemRoles = function() {
         var options = {
            uri: PLATFORM_URL+"/admin/user/"+req.systemKey+"/roles",
            headers :{"ClearBlade-DevToken": req.userToken},
            body: {}
        };
        var requestObject = Requests();
        requestObject.get(options, function(err,httpresponse) {
            if (err === true){
                response.err = true;
                response.messages.push("Unable to get System roles, Please ensure you are running this service from the Developer Console");
            }
             else {
                systemRoles = JSON.parse(httpresponse);
            }
            
        });
    };
    
    var checkConstants = function(){
        var checkConstantEmpty = function(constant){
            if (constant === "") {
                return true;
            } else {
                return false;
            }
        }; 
        if( checkConstantEmpty(PLATFORM_URL) ){
            response.err = true;
            response.messages.push("PLATFORM_URL not set in ConstantsSplunk Library");
        }
        if( checkConstantEmpty(SPLUNK_KEY) ){
            response.err = true;
            response.messages.push("SPLUNK_KEY not set in ConstantsSplunk Library");
        }
        if( checkConstantEmpty(SPLUNK_HOSTNAME) ){
            response.err = true;
            response.messages.push("SPLUNK_HOSTNAME not set in ConstantsSplunk Library");
        }
        if( checkConstantEmpty(PORTNO) ){
            response.err = true;
            response.messages.push("SPLUNK_PORTNO not set in ConstantsSplunk Library");
        }
    };

    var addRoleToUser = function(role) {
        if (role===""){
            
        } else {
            var roleId = ""
            
            for( var i =0; i< systemRoles.length; i++){
                    
                if (systemRoles[i].Name == role){
                    roleId = systemRoles[i].ID;
                }
            }
            
            var options = {
                uri: PLATFORM_URL+"/admin/user/"+req.systemKey,
                headers :{"ClearBlade-DevToken":req.userToken},
                body: {
                    "user":new_user_id,
                    "changes": {
                        "roles":
                            {
                                "add":[roleId]
                            }
                    }
                }
            };
            var requestObject = Requests();
            requestObject.put(options, function(err,httpresponse) {
                if (err === true){
                    
                }
                 else {
                    //role added
                }
                
            });
        }
    }
    
    var createUser = function(email, password, role){
        ClearBlade.init({
    		systemKey: req.systemKey,
    		systemSecret: req.systemSecret,
    		registerUser: true,
    		email: email,
    		password: password,
    		callback: function(err, body) {
    			if(err) {
    				response.err= true;
    				response.messages.push("Failed to create user "+email);
    			} else {
    			    new_user_id = body.user_id;
                    
    			    ClearBlade.init({request:req});
    			    response.messages.push("Created "+email+" user");
    			    var query = ClearBlade.Query();
                    query.equalTo("email", email);
                    var user = ClearBlade.User();
    			    user.setUsers(query,null, function(){
    			        addRoleToUser(role);
    			    });
    			}
    		}
    	});
    };
    
    
    
    var sendResponse = function(){
        if (response.err){
            resp.error(response);
        }else{
            resp.success(response);    
        }
        
    };
    
    var main = function() {
        getSystemRoles();
        
        //create PortalEditor User
        checkConstants();
        if (response.err === true) {
            sendResponse();
        }else {
            createUser("splunkuser@clearblade.com", portalUserPassword, "SplunkUser", "");
            sendResponse();
        }
    };
    
    main();
}