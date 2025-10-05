import cn from 'classnames';

import styles from './styles.module.css'
import { Button, Input, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ISensor } from '../../interface';
import { useEffect, useState } from 'react';
import { createSensors, deleteSensors } from '../../api';
import { updateSensors } from '../../api/updateSensors';
import { useMapSearchParams } from '../../hook/useMapSearchParams';
import { EditType } from '../../utils/constants';

interface IProps {
    visible: boolean
    senser: ISensor | null
    onClose: () => void
}

export function SensorDialog({ visible, senser, onClose }: IProps) {
    const [senserData, setSenserData] = useState<ISensor>(senser ?? { id: '', x: 0, y: 0, name: '' });
    const [isSelectingLocation, setIsSelectingLocation] = useState(false);
    const [nameError, setNameError] = useState(false);
    const { setEditType, selectedCoordinates, setSelectedCoordinates } = useMapSearchParams();

    const onClickDelete = async () => {
        senser && await deleteSensors(senser.id);
        setIsSelectingLocation(false);
        setEditType(EditType.ADD_MARKER);
        onClose();
    }

    const handleClose = () => {
        setIsSelectingLocation(false);
        setEditType(EditType.ADD_MARKER);
        onClose();
    }

    const onClickSave = async() => {
        // Проверяем, что имя заполнено
        if (!senserData.id.trim()) {
            setNameError(true);
            return;
        }
        
        setNameError(false);
        
        if (senser) {
            await updateSensors(Number(senserData.id), senserData);
            handleClose();
            return;
        }

        await createSensors(senserData);
        handleClose();
    }  
  
    const handlePickMarker = async() => {
        if (isSelectingLocation) {
            // Останавливаем режим выбора
            setIsSelectingLocation(false);
            setEditType(EditType.ADD_MARKER);
        } else {
            // Начинаем режим выбора
            setIsSelectingLocation(true);
            setEditType(EditType.ADD_MARKER);
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSenserData(prev => ({ ...prev, id: e.target.value }));
        if (nameError) {
            setNameError(false);
        }
    }    

    useEffect(() => {
        if (senser) {
            // Режим редактирования - устанавливаем данные сенсора
            setSenserData(senser);
            setNameError(false);
        } else {
            // Режим создания - очищаем поля
            setSenserData({ id: '', x: 0, y: 0, name: '' });
            setNameError(false);
        }
    }, [senser])

    useEffect(() => {
        if (selectedCoordinates && isSelectingLocation) {
            setSenserData(prev => ({
                ...prev,
                x: selectedCoordinates.x,
                y: selectedCoordinates.y
            }));
            setIsSelectingLocation(false);
            setEditType(EditType.ADD_MARKER);
            setSelectedCoordinates(null);
        }
    }, [selectedCoordinates, isSelectingLocation, setEditType, setSelectedCoordinates])


    if (!visible) {
        return null;
    }

    return <div className={cn(styles.dialog, {[styles.hidden]: !visible})}>
        <div className={styles.header}>
            <Typography.Title style={{ margin: '10px 0px'}} level={4}>{senser ? 'Редактировать метку' : 'Добавить метку'}</Typography.Title>
            <Button 
                type="text" 
                icon={<CloseOutlined />} 
                onClick={handleClose}
                className={styles.closeButton}
            />
        </div>
        <div className={styles.form}>
            <Input 
                disabled={Boolean(senser)} 
                placeholder="Имя метки" 
                value={senserData.name} 
                onChange={handleNameChange}
                status={nameError ? 'error' : undefined}
            />
            <Input placeholder="Долгота" type='number' value={senserData.x} onChange={(e) => setSenserData(prev => ({ ...prev, x: Number(e.target.value) }))}/>
            <Input placeholder="Широта" type='number' value={senserData.y} onChange={(e) => setSenserData(prev => ({ ...prev, y: Number(e.target.value) }))}/>
        </div>

        <div className={styles.footer}>
            {!senser && (
                <Button 
                    type={isSelectingLocation ? "primary" : "default"}
                    variant={isSelectingLocation ? "filled" : "outlined"}
                    style={{ width: '100%' }} 
                    onClick={handlePickMarker}
                >
                    {isSelectingLocation ? 'Отменить выбор' : 'Выбор на карте'}
                </Button>
            )}
        <div className={styles.button_group}>
            <Button 
                type="primary" 
                style={{ width: '100%' }} 
                onClick={onClickSave}
                disabled={isSelectingLocation}
            >
                Сохранить
            </Button>
            {senser && <Button type="primary"  style={{ width: '100%' }} danger onClick={onClickDelete}>Удалить</Button>}
        </div>
        </div>
        
    </div>
}