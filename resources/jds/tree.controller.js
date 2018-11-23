sap.ui.controller("jds.tree", {
  onCreateAddressBook: function () {
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
