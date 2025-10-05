import { Space, Typography } from 'antd';
import { useGeometryPoints } from '../../hook';
import styles from './styles.module.css';
import { calculateDistance } from '../../utils/coordsDiffs';

export function InfoBar() {
    const { currentPosition, positionHistory } = useGeometryPoints()

    return <div className={styles.wrapper}>
        <div className={styles.bar}>
            <Space direction='vertical' align='center'>
                <Typography.Text type='secondary'>Долгота</Typography.Text>
                <Typography.Text color='gray'>{currentPosition.x}</Typography.Text>
            </Space>

            <Space direction='vertical' align='center'>
                <Typography.Text type='secondary'>Широта</Typography.Text>
                <Typography.Text color='gray'>{currentPosition.y}</Typography.Text>
            </Space>

            <Space direction='vertical' align='center'>
                <Typography.Text type='secondary'>Скорость</Typography.Text>
                <Typography.Text color='gray'>{positionHistory[positionHistory.length - 1] ? calculateDistance(currentPosition.x, currentPosition.y, positionHistory[positionHistory.length - 1]?.x ?? 0, positionHistory[positionHistory.length - 1]?.y ?? 0) / (Math.abs(currentPosition.date - positionHistory[positionHistory.length - 1]?.date) / 1000) : '-'}</Typography.Text>
            </Space>
        </div>
    </div>
}