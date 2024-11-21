import Text from '@shared/ui/Text';
import { useTranslation } from 'react-i18next';

import cls from './AboutUsPage.module.scss';

const AboutUsPage = () => {
  const { t } = useTranslation('about-us');
  
  return (
    <div className={cls.AboutUsPage}>
      <Text tag="p" view="p-20" className={cls.AboutUsPage__text}>
        {t('Вступление')}
      </Text>
      <Text tag="p" view="p-20" className={cls.AboutUsPage__text}>
        {t('Основная часть')}
      </Text>
      <Text tag="p" view="p-20" className={cls.AboutUsPage__text}>
        {t('Заключение')}
      </Text>
    </div>
  );
};

export default AboutUsPage;
