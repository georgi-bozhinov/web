sap.ui.controller("user.info", {
    getModel() {
        if (!this.model) {
            var url = "/api/addressbook/userinfo"
            const oHeaders = {
                'Authorization': `Bearer ${keycloak.token}`
            }
            var oModel = new sap.ui.model.json.JSONModel(null, false);
            oModel.loadData(url, null, true, "GET", null, false, oHeaders);

            sap.ui.getCore().setModel(oModel);
            // var restErrorMessage = "Something has gone wrong while accessing the REST service at " + url + ". Please check whether the node.js application " +
            //     "is up and running. Depending on your runtime either execute 'cf logs python-hello-world-backend --recent' or 'xs logs python-hello-world-backend --recent'."

            // oModel.attachRequestFailed(function (oControlEvent) {
            //     /**
            //      * if the session is invalid the page will be
            //      * reloaded and the user will be redirected to the login page
            //      */
            //     if (oControlEvent.mParameters && oControlEvent.mParameters.statusCode === 401) {
            //         //location.reload();
            //     }
            //     else {
            //         alert(restErrorMessage);
            //     }
            // })

            this.model = oModel;
        }

        return this.model;
    },

    getUserData() {
        const oModel = this.getModel();
        const url = "/api/addressbook/userinfo";
        const oHeaders = {
            'Authorization': `Bearer ${keycloak.token}`
        }
        oModel.loadData(url, null, true, "GET", null, false, oHeaders);
    }
});