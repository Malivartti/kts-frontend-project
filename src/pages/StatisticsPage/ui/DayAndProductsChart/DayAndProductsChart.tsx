
import { dayAndProducts } from '@entities/Product';
import { useProductsStore } from '@shared/stores/ProductsStore';
import Text from '@shared/ui/Text';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory';

import cls from './DayAndProductsChart.module.scss';

const DayAndProductsChart = () => {
  const productsStore = useProductsStore();
  const { t } = useTranslation('statistics');

  const objOfDayAndProducts = useMemo(
    () => dayAndProducts(productsStore.products),
    [productsStore.products]
  );

  const keysForChart = useMemo(
    () => Object.keys(objOfDayAndProducts),
    [objOfDayAndProducts]
  );
  
  const dataForChart = useMemo(
    () => Object.entries(objOfDayAndProducts)
      .map(item => ({
        x: item[0],
        y: item[1],
      })
      ), [objOfDayAndProducts]
  );

  return (
    <div>
      <Text className={cls.DayAndProductsChart__title} tag='h2' view='p-32'>
        {t('Количество добавленный продуктов по дням')}
      </Text>
      <Text className={cls.DayAndProductsChart__title} tag='h3' view='p-20'>
        {t('Всего дней')} {keysForChart.length}
      </Text>
      <VictoryChart
        domainPadding={{ x: 20, y: 100 }}
        theme={VictoryTheme.clean}
        padding={{
          left: 120,
          bottom: 100,
        }}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => datum.y}
            labelComponent={
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
            }
          />
        }
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

        <VictoryLine
          categories={{
            x: keysForChart,
          }}
          data={dataForChart}
        />
      </VictoryChart>
    </div>
  );
};

export default observer(DayAndProductsChart);
