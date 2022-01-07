import angular from 'angular';

var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
  
  //login page showing only
  $scope.loginPage = true;
  $scope.buildingDirectoryPage = false;
  $scope.aboutUsPage = false;
  $scope.registrationPage = false;
  $scope.buildingDirectoryNAVTitle = false;



    
  // other show hides within the building directory div
  $scope.buildingInfoPage = false;
  $scope.projectInfoPage = false;
  $scope.addProjectPage = false;

  $scope.problemCommentsPage = false;
  $scope.addComments = false;
  $scope.addWork = false;
  $scope.signalproblemcomments =false;
  $scope.comments=false;
  $scope.addBuildingPage=false;



    //////////////////////////LOGIN PAGE ///////////////////
    $scope.test = "Test Successful!";

    // Gets the user list 
    $scope.targetUserList = 'https://happybuildings.sim.vuw.ac.nz/api/allanben/user_list.json'

    $http.get($scope.targetUserList)
    // funcion executed if successful
    .then(function successCall(response){
      $scope.output = "Successfully retrieved userList from the server"
      // retrieves userList from response object - using the right name is important! e.g. users is the name of the list in the JSON file
      $scope.userList = response.data.users;
    }, 
    // function executed if error
    function errorCall(response){
      $scope.output = "Error retrieving userList from the server "
      $scope.output += " - ErrorCode = "
      $scope.output += response.status;   // google error code to debug
    })



      $scope.loginValidator = function() {
        for(var i = 0; i < $scope.userList.length; i++){
          if($scope.userName == $scope.userList[i].LoginName && $scope.userPwd == $scope.userList[i].Password && $scope.userList[i].UserType == "manager"){

            $scope.loginPage = false;
            $scope.buildingDirectoryPage = true;
            $scope.buildingDirectoryNAVTitle = true;
            }

           else if ($scope.userName == $scope.userList[i].LoginName && $scope.userPwd == $scope.userList[i].Password && $scope. userList[i].UserType == "owner"){

            $scope.loginPage = false;
            $scope.buildingDirectoryPage = true;
            $scope.buildingDirectoryNAVTitle = true;
            }

            else if ($scope.userName == $scope.userList[i].LoginName && $scope.userPwd == $scope.userList[i].Password && $scope. userList[i].UserType == "contractor"){
            
            $scope.feedback = 'Login Successful';
            $scope.loginPage = false;
            $scope.buildingDirectoryPage = true;
            $scope.buildingDirectoryNAVTitle = true;
            }

            else {
              $scope.feedback = "Username or password entered was incorrect";
            } 
        }
      };







  ///////////////////////// NAVIGATION BAR ////////////////////
  //shows the aboutus page, nagivation bar
  $scope.showAboutUs = function () {
    $scope.loginPage = false;
    $scope.registrationPage = false;
    $scope.aboutUsPage = true;
  }

  //shows the rego page, nagivation bar
  $scope.showRegistration = function () {
    $scope.loginPage = false;
    $scope.aboutUsPage = false;
    $scope.registrationPage = true;
  }


  // shows the login page, when on other pages from nav bar
  $scope.showLogin = function () {
    $scope.aboutUsPage = false;
    $scope.registrationPage = false;
    $scope.loginPage = true;
  }

  // AFTER LOGGED IN NAV BAR
  // logs a user out of the everything via navigation bar
  $scope.showOut = function () {
    $scope.aboutUsPage = false;
    $scope.registrationPage = false;
    $scope.buildingDirectoryPage = false;
    $scope.buildingDirectoryNAVTitle = false;
    $scope.projectInfoPage = false;
    $scope.addProjectPage = false;
    $scope.buildingInfoPage = false;
    $scope.problemCommentsPage = false;
    $scope.addComments = false;
    $scope.addWork = false;
    $scope.signalproblemcomments = false;
    $scope.comments = false;
    $scope.loginPage = true;
  }

    //shows the aboutus page, nagivation bar within directory 
   $scope.showAboutUs2 = function () {
    $scope.aboutUsPage = false;
    $scope.registrationPage = false;
    $scope.buildingDirectoryPage = false;
    $scope.buildingDirectoryNAVTitle = false;
    $scope.projectInfoPage = false;
    $scope.addProjectPage = false;
    $scope.buildingInfoPage = false;
    $scope.problemCommentsPage = false;
    $scope.addComments = false;
    $scope.addWork = false;
    $scope.signalproblemcomments = false;
    $scope.comments = false;
    $scope.loginPage = false;
    $scope.aboutUsPage = true;
   }


    // takes you back to the building directory from any screen when logged in
    $scope.showDirectory = function () {
      $scope.aboutUsPage = false;
      $scope.registrationPage = false;
      $scope.projectInfoPage = false;
      $scope.addProjectPage = false;
      $scope.buildingInfoPage = false;
      $scope.problemCommentsPage = false;
      $scope.addComments = false;
      $scope.addWork = false;
      $scope.signalproblemcomments = false;
      $scope.comments = false;
      $scope.loginPage = false;
      $scope.buildingDirectoryPage = true;
    }






  //////////////// Building directory  ////////////////

  // shows the building info screen after clicking view more
   $scope.showBuildingInfoPage = function (x) {
    $scope.ID = x.ID;
    $scope.Owner = x.Owner;
    $scope.Address = x.Address;
    $scope.BuildingType = x.BuildingType;
    $scope.ConstructionDate = x.ConstructionDate;
    
    $scope.buildingDirectoryPage = false;
    $scope.buildingInfoPage = true;
    filteredBuilding();
  }

  // Exits the building info page after clicking exit 
   $scope.exitBuildingInfoPage = function () {
    $scope.buildingInfoPage = false;
    $scope.buildingDirectoryPage = true;
   }

  // shows the project info page after clicking project info
   $scope.showProjectInfo = function () {
     $scope.buildingInfoPage = false;
     $scope.projectInfoPage = true;
   }
  // Exits the project info page after Exit
   $scope.exitProjectInfo = function () {
     $scope.buildingInfoPage = true;
     $scope.projectInfoPage = false;
   }


  // exits the building info screen back to building diectory 
   $scope.exitBuildingInfoPage = function () {
    $scope.buildingDirectoryPage = true;
    $scope.buildingInfoPage = false;

  }

 //////////// Add building page ///////////////
  // brings up the add building screen 
   $scope.showAddBuilding = function() {
    $scope.addBuildingPage=true;
    $scope.buildingDirectoryPage = false;
    }

  // exits the building page
   $scope.exitAddBuilding = function() {
    $scope.addBuildingPage = false;
    $scope.buildingDirectoryPage = true;
   }






  /////////// Add project ///////////////
  // brings up the add project screen 
   $scope.showAddProject = function () {
    $scope.buildingInfoPage = false;
    $scope.addProjectPage = true;
   }

  // exits the add project page 
   $scope.exitAddProject = function () {
    $scope.buildingInfoPage = true;
    $scope.addProjectPage = false;
   }




  //Shows Signal Problem Page and hides project details page
  $scope.showSignalProblem = function () {
    $scope.problemCommentsPage = true;
    $scope.projectInfoPage = false;

  }

  //Signal Problem Page Exit Button
  $scope.exitProblemComments = function () {
    $scope.projectInfoPage = true;
    $scope.problemCommentsPage = false;
  }

  //Shows Add Comment Page and hides project details page 
  $scope.showAddComment = function () {
    $scope.addComments = true;
    $scope.projectInfoPage = false;
    $scope.problemCommentsPage = false;
  }

  //Add Comment Page Exit Button, hides other pages in the nav bar
  $scope.exitAddComments = function () {
    $scope.addComments = false;
    $scope.projectInfoPage = true;
    $scope.problemCommentsPage = false;

  }

  //Shows Add Work Page 
  $scope.showAddWork = function () {
    $scope.addWork = true;
    $scope.projectInfoPage = false;

  }
  //Add Work Page Exit Button 
  $scope.addWorkExit = function () {
    $scope.addWork = false;
    $scope.projectInfoPage = true;

  }


  // gets the building information from the server 
  $scope.buildingTarget = 'https://happybuildings.sim.vuw.ac.nz/api/allanben/building_dir.json'
    // function gets data 

  $scope.buildingList=[];

      $http({
        method: 'GET',
        url: $scope.buildingTarget
      })
      .then(function successCallBack(response) {
          $scope.buildingList = response.data.buildings
          $scope.status = response.status;
          $scope.data = response.data;
          $scope.headers = window.navigator.userAgent;
        },
        function errorCallBack(response) {
          $scope.status = response.status;
          $scope.data1 = 'Request failed';
          $scope.headers = window.navigator.userAgent;
        });




// // Get a unique Building ID index
//       var buildingID = 0;
//       for (x of $scope.buildingList) {
//         buildingID = Math.max(x.buildingID, buildingID);
//       }
//////// POST BUILDING information to the server//////////////
 //  These are ng-model connected to the form in the index.html
  //  Intialised with the data from the Server Communication and JSON syntax
    $scope.ID = 0;
    $scope.Owner = "Owners name"
    $scope.Address = "Address"
    $scope.BuildingType = "null"
    $scope.ConstructionDate = new Date();

  //  URL from Server Communication and JSON syntax in the Project tab on Blackboard.
    var postBuildingURL = "https://happybuildings.sim.vuw.ac.nz/api/allanben/update.building.json";


  //  Click function bound to the Add Project button in the index.html
  //  Once clicked, it posts an object based on what input fields have been edited.
  $scope.postBuilding = function () {
      //  Creates an object called "project" based on what has been changed in the Add Project form.
      
      var building = {
        "ID": $scope.ID,
        "Owner": $scope.Owner,
        "Address": $scope.Address,
        "BuildingType": $scope.BuildingType,
        "ConstructionDate": $scope.ConstructionDate,
      };

      //  $http.post call, uses the URL from before.
      $http.post(postBuildingURL, building).then(
        function success(obj) {
          alert("Building Successfully Posted"); // Successful post
          $scope.buildingList.push(building);
          $scope.addBuildingPage = false;
          $scope.buildingDirectoryPage = true;


        }, function error() {
          alert("Error: Couldn't post to server"); // Unsuccessful

        }
      );
  }


    // Delete a building function
    $scope.deleteBuilding = function (build, index) {
        $http.delete("https://happybuildings.sim.vuw.ac.nz/api/allanben/delete.building."+build.buildingID+".json").then(function success(){
          $scope.buildingList.splice(index, 1);

        });
      }










///////////// Add new user, create a new account and post to server ////
 //  These are ng-model connected to the form in the index.html
  //  Intialised with the data from the Server Communication and JSON syntax

    $scope.LoginName = "New Username";
    $scope.Password = "";
    $scope.UserType = "youre User Type";

  //  URL from Server Communication and JSON syntax in the Project tab on Blackboard.
    var postUserURL = " https://happybuildings.sim.vuw.ac.nz/api/allanben/update.user_list.json";


  //  Click function bound to the Add Project button in the index.html
  //  Once clicked, it posts an object based on what input fields have been edited.
  $scope.postUser = function () {
      //  Creates an object called "project" based on what has been changed in the Add Project form.
      var newUser = {
        "LoginName":$scope.LoginName,
        "Password": $scope.Password,
        "UserType": $scope.UserType,
      };

      //  $http.post call, uses the URL from before.
      $http.post(postUserURL, newUser).then(
        function success(obj) {
          alert("Welcome to Happy Buildings. Your account will be verified shortly"); // Successful post
          $scope.registrationPage = false;
          $scope.loginPage = true;
          $scope.status3 = obj.status;


        }, function error() {
          alert("Error: Couldn't Validate your account, please try again"); // Unsuccessful
          $scope.status3 = obj.status;

        }
      );
  }



  // //Creates list of PROJECTs corresponding only to a specific Building ID
  // $scope.filteredProjects = [];
  //   filterProjects = function() {
  //     //loop through each item in the courseAssociations table
  //     for (var e = 0; e < $scope.projectData.length; e++) {
  //       if ($scope.projectData[e].ID == $scope.BuildingID) {
  //         //if the building id exists, push that projectID to the new filterTable table
  //         $scope.filteredProjects.push($scope.projectData[e].ID);
  //       }
  //     }
  //   };




//  // need to create a button that shows the building info screen after clicking view more which does this but for only the building being viewed in the table going to be an for loop if function 
//     $scope.filteredBuilding = [];
//     // View a building Depending on its index in the table/JSON file
//     $scope.filteredBuildings = function() {
//       for (var i = 0; i < $scope.buildingList.length; i++) {
//         if ($scope.buildingList[i].ID == $scope.buildingID[i]) {
         
//           //if the building id exists, push that BuildingID and its info to the new filterTable table
//           $scope.filteredBuilding.push($scope.buildingList[i]);
//         } 
//       }
//     };




    //   $scope.listOfProjects = [];

    //   leng = 20;
    //  for (var i = 1; i < leng; i++) {
    //    var projectGetURL = "https://happybuildings.sim.vuw.ac.nz/api/allanben/project."+ i +".json";

    //   $http.get(projectGetURL).then(
    //     function success(project) {
    //       $scope.listOfProjects.push(project.data); // Formats it to display on the screen
    //       }, function fail () {  
    //       }
    //   );
    // }
  ////////////// Add PROJECT page, http post, etc  //////////////////
  
  
  //  These are ng-model connected to the form in the index.html
  //  Intialised with the data from the Server Communication and JSON syntax
  $scope.ProjectID = 1;
  $scope.Name = "Scaffolding and painting."
  $scope.BuildingID = 47;
  $scope.Status= "open";
  $scope.StartDate= new Date();
  $scope.EndDate=  new Date();
  $scope.ContactPerson= "Joe Bloggs";
  $scope.ProjectManager= "Sally Smith";
  $scope.Contractor= "";

 

  //  URL from Server Communication and JSON syntax in the Project tab on Blackboard.
    var projectPostURL = 'https://happybuildings.sim.vuw.ac.nz/api/your_username/update.project.json';



  //  Click function bound to the Add Project button in the index.html
  //  Once clicked, it posts an object based on what input fields have been edited.
  $scope.postProject = function () {


    // // Get a unique project ID
    //   var projectID = 0;
    //   for (x of $scope.listOfProjects) {
    //     projectID = Math.max(x.ProjectID, projectID);
    //   }

      //  Creates an object called "project" based on what has been changed in the Add Project form.
      var project = {
        "ProjectID":$scope.ProjectID,
        "Name": $scope.Name,
        "BuildingID": $scope.BuildingID,
        "Status": $scope.Status,
        "StartDate": $scope.StartDate,
        "EndDate":$scope.EndDate,
        "ContactPerson":$scope.ContactPerson,
        "ProjectManager":$scope.ProjectManager,
        "Contractor":$scope.Contractor
      };
      //  $http.post call, uses the URL from before.
      $http.post(projectPostURL, project).then(
        function success(obj) {
          alert("Project Successfully Posted"); // Successful post
          
          $scope.buildingInfoPage = true;
          $scope.addProjectPage = false;
          $scope.status2 = obj.status;

        }, function error() {
          alert("Error: Couldn't post to server"); // Unsuccessful
        }
      );
  }

///Click function bound to the add Work button in index.html
$scope.postWork = function (){
  //creates a 'work' object based on the fields that have been entered in the add work screen
var work = {
  "TypeOfWork":$scope.TypeOfWork,
  "Status":$scope.Status,
};
http.post (projectTarget, work).then (
  function success (obj) {
   alert("Work Successfully Posted");
    $scope.addWork = false;
    $scope.projectInfoPage = true;
   $scope.status5 = obj.status;
  },
  function error () {
  alert("Error: Couldn't post to server");
  }
)
$scope.workList=[];
$http.get(projectTarget).then (function success (response) {
  $scope.workList = response.data.buildings
});
};


///Once clicked, it will post an object based on what input forms have been typed 

  //creates a 'work' object based on the fields that have been entered in the add work screen

//http post call





  $scope.projectList=[];
 // gets the project info from the server 
  $scope.projectTarget = "https://happybuildings.sim.vuw.ac.nz/api/allanben/project"+ $scope.ID +".json";

    // function gets data 
 //   $scope.getprojectDirectory = function () {
      $http({
        method: 'GET',
        url: $scope.projectTarget
      })
      .then(function successCallBack(response) {
          $scope.projectList = response.data
          $scope.status4 = response.status;
          $scope.projectData = response.data;
        },
        function errorCallBack(response) {
          $scope.status4 = response.status;
          $scope.projectData = 'Request failed';
        });
 //   };



  //  Click function bound to the Alert Project button in the index.html
  $scope.alertProject = function () {
      //"https://happybuildings.sim.vuw.ac.nz/api/your_username/project.$scope.inputProjectID.json"
    //  [number] is subsituted with $scope.inputProjectID so the user can specfify which project to get.
    var projectGetURL = "https://happybuildings.sim.vuw.ac.nz/api/allanben/project."+ $scope.inputProjectID +".json";

    //  $http.get call, uses URL from above
    $http.get(projectGetURL).then(
      function success(project) {
        alert(JSON.stringify(project.data,null,2)); // Formats it to display on the screen
      }, function error() {
        alert("Project does not exist")
      }
    );

  }


    // Get a unique Building ID index
    var ProjectID = 0;
    for (x of $scope.projectList) {
      ProjectID = Math.max(x.ProjectID, ProjectID);
    }


   // Delete a project function
    $scope.deleteProject = function (proj, index) {
        $http.delete("https://happybuildings.sim.vuw.ac.nz/api/allanben/delete.building."+proj.ProjectID+".json").then(function success(){
          $scope.projectList.splice(index, 1);

        });
      }



});
