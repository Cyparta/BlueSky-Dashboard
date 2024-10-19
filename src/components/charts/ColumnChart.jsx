"use client"

import React from 'react';
import {Column} from '@ant-design/plots';

const ColumnChart = ({data}) => {

    const config = {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: 'status',
        isGroup: true,
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
    };

    return <Column {...config} />;
};

export default ColumnChart;
