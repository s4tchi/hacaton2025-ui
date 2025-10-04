import { Header } from "../header";
import { Anchorlist } from "../anchor-list";
import styles from './sider.module.css';

export const Sider = () => {
    return (
        <div className={styles.container}>
          <Header></Header>
          <Anchorlist></Anchorlist>
        </div>
    )

  
}