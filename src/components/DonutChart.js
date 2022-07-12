import React from 'react';
import { ChartDonut } from '@patternfly/react-charts';

const DonutChart = () => (
    <div style={{ height: '150px', width: '275px' }}>
        <ChartDonut
            ariaDesc="Average number of pets"
            ariaTitle="Donut chart example"
            constrainToVisibleArea
            data={[{ x: 'Cats', y: 35 }, { x: 'Dogs', y: 55 }, { x: 'Birds', y: 10 }]}
            height={150}
            labels={({ datum }) => `${datum.x}: ${datum.y}%`}
            legendData={[{ name: 'Cats: 35' }, { name: 'Dogs: 55' }, { name: 'Birds: 10' }]}
            legendOrientation="vertical"
            legendPosition="right"
            padding={{
                bottom: 20,
                left: 20,
                right: 145, // Adjusted to accommodate legend
                top: 20
            }}
            subTitle="Pets"
            title="100"
            width={275}
        />
    </div>
)

export default DonutChart