import { InfoBar, Map } from "../components"
import styles from './map-page.module.css';
import { Sider } from "../components/sider";

export const MapPage = () => {

  return (
      <div className={styles.main}>
        <Sider></Sider>
          
      <div className={styles.mapContainer}>
        <Map />
        <InfoBar />
      </div>
</div>
  )
}