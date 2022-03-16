import React from "react";
import { PageHeader } from "antd";
import CustomRow from "../../../components/CustomRow";
import CustomCol from "../../../components/CustomCol";

function OptimizeSearch(props) {
    return (
        <React.Fragment>
            <CustomRow>
                <CustomCol xl={24}>
                    <PageHeader title="Optimize Your Search" className="FormPageHeader">
                    </PageHeader>
                </CustomCol>
            </CustomRow>
        </React.Fragment>
    );
}

export default OptimizeSearch;
