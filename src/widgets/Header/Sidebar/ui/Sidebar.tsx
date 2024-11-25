import Text from '@shared/ui/Text';
import { FC, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import ProductsList from './ProductsList';
import cls from './Sidebar.module.scss';

type SidebarProps = {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ isShow, setIsShow }) => {
  const { t } = useTranslation();

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!sidebarRef.current?.contains(event.target as HTMLElement)) {
        setIsShow(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isShow, setIsShow]);

  if (!isShow) {
    return;
  }

  return (
    <div className={cls.Sidebar}>
      <div className={cls.Sidebar__container} ref={sidebarRef}>
        <Text className={cls.Sidebar__title} tag='h2' view='p-32'>{t('Покупки')}</Text>
        <ProductsList />
      </div>
    </div>
  );
};

export default Sidebar;
