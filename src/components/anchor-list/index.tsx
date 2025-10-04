import { List } from 'antd';
import { Typography } from "antd";
import styles from './anchor-list.module.css';
import { useMapSearchParams } from '../../hook/useMapSearchParams';
import { ISensor } from '../../interface';
import { useState } from 'react';
const { Text } = Typography;

const AnchorListItem = ({item, isActive, setActiveId}: { item: ISensor, isActive: boolean, setActiveId: React.Dispatch<React.SetStateAction<string | null>>}) => {
  const textStyle = isActive ? { color: '#1677ff', fontWeight: '600' } : {};
  const handleClick = () => {
    setActiveId(item.id)
  }

  return (
    <List.Item 
      style={{ padding: '0px 10px', display: 'flex', flexDirection: 'row', height: '55px' }}
      onClick={handleClick}>
        <Text style={{ padding: '15px 0px', fontSize: '16px', ...textStyle }}>{item.name}</Text>
        {isActive && <div className={styles.divider}>&nbsp;</div>}
    </List.Item>
  );
};

export const Anchorlist = () => {
    const { markers } = useMapSearchParams();
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
    <List
      size="large"
      dataSource={markers}
      renderItem={(item) => <AnchorListItem item={item} isActive={activeId === item.id} setActiveId={setActiveId}></AnchorListItem>}
      style={{ overflow: 'scroll', height: '75%' }}
      split={false}
    />
    )

  
}