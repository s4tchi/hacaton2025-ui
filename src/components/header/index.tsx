import { Typography } from 'antd';
import styles from './header.module.css';
import Logo from '../../assets/radar.png';

export const Header = () => {
    return (
    <div className={styles.container}>
      <img src={Logo} alt="logo" style={{ width: 32, height: 32 }} />
      <Typography.Title level={2} style={{ margin: 0 }}>
        PC/CC
      </Typography.Title>
    </div>
    )

  
}