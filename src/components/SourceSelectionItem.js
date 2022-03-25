import React, { memo, useMemo, useState } from "react";
import { Badge, Button, Checkbox, Typography } from "antd";
import { FiSettings } from "react-icons/fi";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import * as RouteUrl from "../model/route";
const { Text } = Typography

function SourceSelectionItem(props) {
    const [checked, setchecked] = useState(false);
    const history = useHistory();

    const onSelectionHandler = (id) => {
        if (props.onCheckedHandler) {
            props.onCheckedHandler(!checked);
        }
        setchecked(!checked);
    }

    return (
        <Badge className="SourceSelectionItem" count={props.source.count} showZero>
            <div className={`SourceSelectionItem_Container ${checked && parseInt(props.source.count) > 0 ? "selected" : checked && parseInt(props.source.count) === 0 ? "error" : ""}`} onClick={() => onSelectionHandler()}>
                <div className="SourceSelectionItem_Container_DetailContainer">
                    <Text className="SourceSelectionItem_Container_DetailContainer-title">{props.source.full_source_name}</Text>
                    <Button type="link" className="SourceSelectionItem_Container_DetailContainer-addConfig"><FiSettings size={18}
                        onClick={() => {
                            history.push({
                                pathname: `${RouteUrl.HINTSEARCH}/${RouteUrl.ADMIN}/${RouteUrl.SOURCES}/${RouteUrl.CONFLUENCE}/${RouteUrl.CONFIGTEMPLATE}`,
                                search: `source=${props.source.full_source_name}`
                            })
                        }} /></Button>
                </div>
            </div>
        </Badge>
    );
}

export default SourceSelectionItem;
