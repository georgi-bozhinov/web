sap.ui.jsview("jds.tree", {
  getControllerName: function () {
    return "jds.tree";
  },

  createContent: function (oController) {
    var backendURL = "/api/addressbook/tree";
    var oModel = new sap.ui.model.json.JSONModel(backendURL, false);
    sap.ui.getCore().setModel(oModel, "oModel");
    var restErrorMessage =
      "Something has gone wrong while accessing the REST service at " +
      backendURL +
      ". Please check whether the node.js application " +
      "is up and running. Depending on your runtime either execute 'cf logs node-hello-world-backend --recent' or 'xs logs node-hello-world-backend --recent'.";

    oModel.attachParseError(function (oControlEvent) {
      alert(restErrorMessage);
    });

    oModel.attachRequestFailed(function (oControlEvent) {
      alert(restErrorMessage);
    });

    var oTable = new sap.ui.table.TreeTable({
      id: "AddressBookOverview",
      columns: [
        new sap.ui.table.Column({ label: "Name", template: "name" }),
        new sap.ui.table.Column({ label: "City", template: "city" }),
        new sap.ui.table.Column({ label: "Phone", template: "phone" })
      ],
      visibleRowCount: 20,
      width: "100%",
      selectionMode: sap.ui.table.SelectionMode.Single,
      selectionBehavior: sap.ui.table.SelectionBehavior.Row
    });

    oTable.setModel(oModel);
    var oSorter = new sap.ui.model.Sorter("name");
    oTable.bindRows("/books", oSorter);

    // button to generate more data
    var oBtn = new sap.ui.commons.Button({
      text: "Create Data",
      press: oController.onCreateAddressBook
    });

    // button to delete all data
    var oDeleteBtn = new sap.ui.commons.Button({
      text: "Delete All Data (requires authorization)",
      press: oController.onDeleteAddressBook
    });

    oTable.setToolbar(
      new sap.ui.commons.Toolbar({ items: [oBtn, oDeleteBtn] })
    );

    var oPanel = new sap.ui.commons.Panel()
      .setText("Address Books")
      .addContent(oTable);

    return oPanel;
  }
});
