sap.ui.controller("jds.tree", {

  getModel() {
    if (!this.model) {
      var url = '/api/addressbook/tree';
      var oModel = new sap.ui.model.json.JSONModel(url, false);
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
    var oModel = this.getModel();
    jQuery.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/addressbook/insert",
      dataType: "json",
      async: false,
      success: function (data, textStatus, jqXHR) {
        oModel.loadData("/api/addressbook/tree");
      },
      statusCode: {
        401: function () {
          location.reload();
        }
      }
    })
  },

  onDeleteAddressBook: function () {
    var oModel = this.getModel();
    jQuery.ajax({
      type: "GET",
      contentType: "application/json",
      url: "/api/addressbook/delete",
      dataType: "json",
      async: false,
      success: function (data, textStatus, jqXHR) {
        oModel.loadData("/api/addressbook/tree");
      },
      statusCode: {
        401: function () {
          location.reload();
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
