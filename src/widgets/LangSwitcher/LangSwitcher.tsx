import classNames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Text from '@/components/Text';

import cls from './LangSwitcher.module.scss';

type LangSwitcherProps = {
  className?: string
}

const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const onToggle = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <button className={classNames(cls.LangSwitcher, className)} onClick={onToggle}>
      <Text tag='span' view='p-18'>
        {t('Язык')}
      </Text>
    </button>
  );
};

export default LangSwitcher;