import { useProductsStore } from '@app/providers/ProductsStoreContextProvider';
import { categoryAndProducts } from '@entities/Category';
import Text from '@shared/ui/Text';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory';

import cls from './CategoryAndProductsChart.module.scss';

const CategoryAndProductsChart = () => {
  const productsStore = useProductsStore();
  const { t } = useTranslation('statistics');

  const ObjOfcategoryAndProducts = useMemo(
    () => categoryAndProducts(productsStore.products),
    [productsStore.products]
  );

  const keysForChart = useMemo(
    () => Object.keys(ObjOfcategoryAndProducts),
    [ObjOfcategoryAndProducts]
  );
  
  const dataForChart = useMemo(
    () => Object.entries(ObjOfcategoryAndProducts)
      .map(item => ({
        x: item[0],
        y: item[1],
      })
      ), [ObjOfcategoryAndProducts]
  );

  return (
    <div>
      <Text className={cls.CategoryAndProductsChart__title} tag='h2' view='p-32'>
        {t('Количество продуктов по категориям')}
      </Text>
      <Text className={cls.CategoryAndProductsChart__title} tag='h3' view='p-20'>
        {t('Всего продуктов')} {productsStore.products.length}
      </Text>
      <Text className={cls.CategoryAndProductsChart__title} tag='h3' view='p-20'>
        {t('Всего категорий')} {Object.keys(ObjOfcategoryAndProducts).length}
      </Text>
      <VictoryChart
        domainPadding={{ x: 20, y: 110 }}
        theme={VictoryTheme.clean}
        horizontal
        padding={{
          left: 120,
          bottom: 100,
        }}
      >
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 8, fill: 'var(--secondary-color)' },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 8, fill: 'var(--secondary-color)' },
          }}
        />

        <VictoryBar
          categories={{
            x: keysForChart,
          }}
          data={dataForChart}
          labelComponent={(
            <VictoryTooltip
              flyoutHeight={15}
              flyoutWidth={25}
              flyoutStyle={{
                strokeWidth: 0,
              }}
              style={{
                fontSize: 8,
              }}
            />
          )}
          labels={({ datum }) => datum.y}
        />
      </VictoryChart>
    </div>
  );
};

export default observer(CategoryAndProductsChart);
