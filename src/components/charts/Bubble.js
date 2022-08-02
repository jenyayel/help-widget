import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { h, Fragment } from 'preact';
import { BubbleChart } from 'reaviz';

const Bubble = () => (
    <BubbleChart
        height={300}
        width={300}
        data={[
            { key: 'AWS', data: 13 },
            { key: 'SendGrid', data: 2 },
            { key: 'Okta', data: 15 }
        ]}
    />
);

export default Bubble