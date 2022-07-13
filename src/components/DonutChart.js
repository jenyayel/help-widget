import React, {useState, useEffect} from 'react';
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';
import { h, Fragment } from 'preact';


const DonutChart = (props) => {

    const [pieData, setPieData] = useState([]);
    
    console.log(props.data)

    // console.log(props)

    useEffect(() => {
        setPieData(props.data);
    },[props]);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <ChartDonut
                ariaDesc="Average number of pets"
                ariaTitle="Donut chart example"
                constrainToVisibleArea
                data={[{ x: 'Age', y: pieData?.nbr_account_age_days }, { x: 'Count', y: pieData?.nbr_transaction_count }, { x: 'Activity', y: (pieData?.nbr_transaction_count/pieData?.nbr_account_age_days)  }]}
                height={150}
                labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                legendData={[{ name: `Age: ${pieData?.nbr_account_age_days}` }, { name: `Count: ${pieData?.nbr_transaction_count}` }, { name: `Activity: ${(pieData?.nbr_transaction_count/pieData?.nbr_account_age_days)}` }]}
                legendOrientation="vertical"
                legendPosition="right"
                padding={{
                    bottom: 20,
                    left: 20,
                    right: 145, // Adjusted to accommodate legend
                    top: 20
                }}
                subTitle="Risk Score"
                title={(100 - pieData?.bilic_rating).toFixed(2)}
                themeColor={ChartThemeColor.multiOrdered}
                width={275}
            />


        </div>
    )
}

export default DonutChart