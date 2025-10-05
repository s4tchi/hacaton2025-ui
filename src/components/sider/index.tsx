import { Header } from "../header";
import { Anchorlist } from "../anchor-list";
import styles from './sider.module.css';
import { Button, Divider, Typography } from "antd";
import { ANCHORS_LABEL } from '../../utils/constants';
import { useMapSearchParams } from "../../hook/useMapSearchParams";
import { useSensorDialog } from "../../hook/useSensorDialog";
const { Text } = Typography;

export const Sider = () => {
  const { markers } = useMapSearchParams();
  const { currentSensor, setIsDialogOpen, setCurrentSensor } = useSensorDialog();

  return (
    <div className={styles.container}>
      <Header></Header>
      <div>
        <Divider style={{ margin: '10px 0px 10px' }}></Divider>
        <div className={styles.text_container}>
          <Typography style={{ fontSize: '20px', padding: '10px 3px 10px 10px' }}>{ANCHORS_LABEL}</Typography>
          <Text type="secondary" style={{ fontSize: '14px', padding: '10px 3px 10px' }}>всего {markers.length}</Text>
        </div>
        <Divider style={{ margin: '10px 0px 10px' }}></Divider>
      </div>
      <Anchorlist></Anchorlist>
      <Divider style={{ margin: '10px 0px 10px' }}></Divider>
      <Button
        type="primary"
        style={{ margin: 'auto 0px', height: '40px', fontSize: '16px' }}
        onClick={() => {
          setIsDialogOpen(false);
          setCurrentSensor(null);
          setIsDialogOpen(true);
        }}>Создать метку</Button>
    </div>
  )


}