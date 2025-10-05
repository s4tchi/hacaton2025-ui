import cn from 'classnames';

import styles from './styles.module.css'
import { Button, Input, Typography } from 'antd';
import { ISensor } from '../../interface';
import { useEffect, useState } from 'react';
import { createSensors, deleteSensors } from '../../api';
import { updateSensors } from '../../api/updateSensors';

interface IProps {
    visible: boolean
    senser: ISensor
    onClose: () => void
}

export function SensorDialog({ visible, senser, onClose }: IProps) {
    const [senserData, setSenserData] = useState<ISensor>(senser ?? { id: '', x: 0, y: 0 });

    const onClickDelete = async () => {
        senser && await deleteSensors(senser.id);
        onClose();
    }

    const onClickSave = async() => {
        if (senser) {
            await updateSensors(Number(senserData.id), senserData);
            return;
        }

        await createSensors(senserData);
        onClose();
    }    

    useEffect(() => {
        if(senser.id !== senserData.id) {
            setSenserData(senser);
        }
    }, [
        senser,
        setSenserData,
        senserData
    ])


    if (!visible) {
        return null;
    }

    return <div className={cn(styles.dialog, {[styles.hidden]: !visible})}>
        <Typography.Title level={4}>{senser ? 'Редактировать метку' : 'Добавить метку'}</Typography.Title>
        <div className={styles.form}>
            <Input disabled={Boolean(senser)} placeholder="Имя метки" value={senserData.id} onChange={(e) => setSenserData(prev => ({ ...prev, id: e.target.value }))}/>
            <Input placeholder="Долгота" type='number' value={senserData.x} onChange={(e) => setSenserData(prev => ({ ...prev, x: Number(e.target.value) }))}/>
            <Input placeholder="Широта" type='number' value={senserData.y} onChange={(e) => setSenserData(prev => ({ ...prev, y: Number(e.target.value) }))}/>
        </div>

        <div className={styles.footer}>
            <Button type="primary" onClick={onClickSave}>Сохранить</Button>
            {senser && <Button type="primary" danger onClick={onClickDelete}>Удалить</Button>}
        </div>
    </div>
}