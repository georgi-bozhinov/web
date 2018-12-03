sap.ui.jsview("user.info", {

    getControllerName: function () {
        return "user.info"
    },

    createContent: function (oController) {
        oController.getUserData();
        var oLayout = new sap.ui.commons.layout.MatrixLayout({
            id: "matrixLayout",
            layoutFixed: false
        })

        // create panel for jwt data
        var oPanelJwt = new sap.ui.commons.Panel()
        oPanelJwt.setText('JWT Token Data')
        oPanelJwt.setShowCollapseIcon(false)
        var oLayoutJwt = new sap.ui.commons.layout.MatrixLayout({
            id: "gridJwt",
            layoutFixed: false
        })
        userNameLabel = new sap.ui.commons.Label({
            text: 'User ID',
            design: sap.ui.commons.LabelDesign.Bold
        })
        userNameValue = new sap.ui.commons.TextView({
            // text: "{/user/id}"
            text: keycloak.idTokenParsed.preferred_username
        })
        firstNameLabel = new sap.ui.commons.Label({
            text: 'First name',
            design: sap.ui.commons.LabelDesign.Bold
        })
        firstNameValue = new sap.ui.commons.TextView({
            // text: "{/user/name/givenName}"
            text: keycloak.idTokenParsed.given_name
        })
        lastNameLabel = new sap.ui.commons.Label({
            text: 'Last name',
            design: sap.ui.commons.LabelDesign.Bold
        })
        lastNameValue = new sap.ui.commons.TextView({
            // text: "{/user/name/familyName}"
            text: keycloak.idTokenParsed.family_name
        })
        oLayoutJwt.createRow(userNameLabel, userNameValue)
        oLayoutJwt.createRow(firstNameLabel, firstNameValue)
        oLayoutJwt.createRow(lastNameLabel, lastNameValue)
        oPanelJwt.addContent(oLayoutJwt)

        // create panel for db data
        var oPanelDb = new sap.ui.commons.Panel();
        oPanelDb.setText("Database Data")
        oPanelDb.setShowCollapseIcon(false)
        var oLayoutDb = new sap.ui.commons.layout.MatrixLayout({
            id: "gridDb",
            layoutFixed: false
        })
        applicationUserLabel = new sap.ui.commons.Label({
            text: 'Application user',
            design: sap.ui.commons.LabelDesign.Bold
        })
        applicationUserValue = new sap.ui.commons.TextView({
            text: "{/dbInfo/0/application_user}"
        })
        technicalUserLabel = new sap.ui.commons.Label({
            text: 'Technical user',
            design: sap.ui.commons.LabelDesign.Bold
        })
        technicalUserValue = new sap.ui.commons.TextView({
            text: "{/dbInfo/0/current_user}"
        })
        oLayoutDb.createRow(applicationUserLabel, applicationUserValue)
        oLayoutDb.createRow(technicalUserLabel, technicalUserValue)
        oPanelDb.addContent(oLayoutDb)

        oLayout.createRow(oPanelJwt)
        oLayout.createRow(oPanelDb)
        return oLayout
    }
});