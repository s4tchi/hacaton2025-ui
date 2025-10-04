import { Map, SensorDialog } from "../components"
import { Button, Typography } from "antd";
import { useMapSearchParams } from "../hook/useMapSearchParams";
import { EditType } from "../utils/constants";
import {
  MARKERS_COUNT_LABEL, 
  NAVIGATION_BUTTON_LABELS, 
  IS_CONNECTED_LABEL
} from "../utils/map-page-labels";
import styles from './map-page.module.css';
import { useGeometryPoints, useSocket } from "../hook";
import { useState } from "react";
import { Sider } from "../components/sider";

export const MapPage = () => {

  const [sensorDialogIsOpen, setSensorDialogIsOpen] = useState(false);

  const { setCurrentPosition } = useGeometryPoints();
  const { isConnected } = useSocket({ handleSyncObjectPosition: (value: string) => {
    setCurrentPosition(JSON.parse(value));
  }});

  const { 
    setEditType,
    markers,
    editType
  } = useMapSearchParams();

  const handleOnClick = (value: EditType) => {
    setEditType(value);
  }

  return (
      <div className={styles.main}>
        <Sider></Sider>
        <div className={styles.container}>
          <div className={styles.navigation_bar}>
            <Button 
            type={editType[EditType.ADD_MARKER] ? 'primary' : 'default'}
            value={EditType.ADD_MARKER}
            onClick={() => handleOnClick(EditType.ADD_MARKER)}
            >
              {NAVIGATION_BUTTON_LABELS[EditType.ADD_MARKER]}
            </Button>
            <Typography.Text>
              {MARKERS_COUNT_LABEL} {markers.length}
            </Typography.Text>
            <Typography.Text>
              {IS_CONNECTED_LABEL[isConnected ? 'connected' : 'disconnected']}
            </Typography.Text>
          </div>
      <div className={styles.mapContainer}>
        <SensorDialog visible={sensorDialogIsOpen} onClose={() => setSensorDialogIsOpen(false)}/>
        <Map />
      </div>
        </div>
      </div>
  )
}