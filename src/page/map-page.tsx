import { Map, SensorDialog } from "../components"
import styles from './map-page.module.css';
import { useState } from "react";
import { Sider } from "../components/sider";

export const MapPage = () => {

  const [sensorDialogIsOpen, setSensorDialogIsOpen] = useState(false);

  // const { setCurrentPosition } = useGeometryPoints();
  // const { isConnected } = useSocket({ handleSyncObjectPosition: (value: string) => {
  //   setCurrentPosition(JSON.parse(value));
  // }});

  // const { 
  //   setEditType,
  //   editType
  // } = useMapSearchParams();

  // const handleOnClick = (value: EditType) => {
  //   setEditType(value);
  // }

  return (
      <div className={styles.main}>
        <Sider></Sider>
        <div className={styles.container}>
          {/* <div className={styles.navigation_bar}>
            <Button 
            type={editType[EditType.ADD_MARKER] ? 'primary' : 'default'}
            value={EditType.ADD_MARKER}
            onClick={() => handleOnClick(EditType.ADD_MARKER)}
            >
              {NAVIGATION_BUTTON_LABELS[EditType.ADD_MARKER]}
            </Button>
            <Typography.Text>
              {IS_CONNECTED_LABEL[isConnected ? 'connected' : 'disconnected']}
            </Typography.Text>
          </div> */}
        <SensorDialog visible={sensorDialogIsOpen} onClose={() => setSensorDialogIsOpen(false)}/>
        <Map />
        </div>
      </div>
  )
}