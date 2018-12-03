sap.ui.controller("jds.tree", {

  getModel() {
    if (!this.model) {
      var url = '/api/addressbook/tree';
      const oHeaders = {
        'Authorization': `Bearer ${keycloak.token}`
      }
      var oModel = new sap.ui.model.json.JSONModel(null, false);
      oModel.loadData(url, null, true, "GET", null, false, oHeaders);

      var restErrorMessage =
        "Something has gone wrong while accessing the REST service at " + url +
        ". Please check whether the node.js application " +
        "is up and running. Depending on your runtime either execute 'cf logs node-hello-world-backend --recent' or 'xs logs node-hello-world-backend --recent'.";

      oModel.attachParseError(function (oControlEvent) {
        alert(restErrorMessage);
      });

      oModel.attachRequestFailed(function (oControlEvent) {
        alert(restErrorMessage);
      });

      this.model = oModel;
    }

    return this.model;
  },

  onCreateAddressBook: function () {
    const oHeaders = {
      'Authorization': `Bearer ${keycloak.token}`
    }
    var oModel = this.getModel();
    jQuery.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/addressbook/insert",
      headers: oHeaders,
      dataType: "json",
      async: false,
      success: function (data, textStatus, jqXHR) {
        oModel.loadData("/api/addressbook/tree", null, true, "GET", null, false, oHeaders);
      },
      statusCode: {
        401: function () {
          alert("Unauthorized!")
        }
      }
    })
  },

  onDeleteAddressBook: function () {
    const oHeaders = {
      'Authorization': `Bearer ${keycloak.token}`
    }
    var oModel = this.getModel();
    jQuery.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/addressbook/delete",
      headers: oHeaders,
      dataType: "json",
      async: false,
      headers: {
        'Authorization': `Bearer ${keycloak.token}`
      },
      success: function (data, textStatus, jqXHR) {
        oModel.loadData("/api/addressbook/tree", null, true, "GET", null, false, oHeaders);
      },
      statusCode: {
        401: function () {
          alert("Unauthorized!")
        },
        403: function () {
          alert(
            "You are not authorized to Delete Data! To remedy this, your user needs to get the Delete scope. " +
            "Thus, create a role based on the Editor role template and assign the role to a group which contains your user!"
          );
        }
      }
    });
  }
});
