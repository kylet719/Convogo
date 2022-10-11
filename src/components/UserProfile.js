var UserProfile = (function() {
    var loggedIn = false;
    var full_name = "";
  
    var getName = function() {
      return full_name;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      full_name = name;     
      // Also set this in cookie/localStorage
    };

    var getLogStatus = function() {
        return loggedIn;
    };

    var setLogStatus = function(bool) {
        loggedIn = bool;
    };
  
    return {
      getName: getName,
      setName: setName,
      getLogStatus: getLogStatus,
      setLogStatus: setLogStatus
    }
  
  })();
  
  export default UserProfile;