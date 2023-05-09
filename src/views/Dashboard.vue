<template>
<div>
    <b-card>
        <b-card-header class="border-0">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">Ticket</el-breadcrumb-item>
                <el-breadcrumb-item>All</el-breadcrumb-item>
            </el-breadcrumb>
        </b-card-header>
        <b-card-body class="border-0">
            <h3 class="mb-0">All</h3>
        </b-card-body>
        <LighterTable :columns="[
              {text:'a1 title',key:'a1'},
              {text:'a2 title',key:'a2'},
              {text:'a3 title',key:'a3'}
              ]" 
              :data="[
              {a1: 'response 1', a2:'rwgwgw', a3:'wwv'}
              ]"
        >
            <template #a1>
                <button>fg</button>
            </template>
        </LighterTable>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :perPage="perPage" :pager-count="pageCount" :total="total"></base-pagination>
        </b-card-footer>
    </b-card>
</div>
</template>

<script>
import LighterTable from '@/components/LighterTable'
// Charts
import * as chartConfigs from '@/components/Charts/config';
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';

// Components
import BaseProgress from '@/components/BaseProgress';
import StatsCard from '@/components/Cards/StatsCard';

// Tables
import SocialTrafficTable from './Dashboard/SocialTrafficTable';
import PageVisitsTable from './Dashboard/PageVisitsTable';

export default {
    components: {
        LineChart,
        BarChart,
        BaseProgress,
        StatsCard,
        PageVisitsTable,
        SocialTrafficTable,
        LighterTable,  
    },
    data() {
        return {
            bigLineChart: {
                allData: [
                    [0, 20, 10, 30, 15, 40, 20, 60, 60],
                    [0, 20, 5, 25, 10, 30, 15, 40, 40]
                ],
                activeIndex: 0,
                chartData: {
                    datasets: [{
                        label: 'Performance',
                        data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
                    }],
                    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                },
                extraOptions: chartConfigs.blueChartOptions,
            },
            redBarChart: {
                chartData: {
                    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Sales',
                        data: [25, 20, 30, 22, 17, 29]
                    }]
                },
                extraOptions: chartConfigs.blueChartOptions
            }
        };
    },
    methods: {
        initBigChart(index) {
            let chartData = {
                datasets: [{
                    label: 'Performance',
                    data: this.bigLineChart.allData[index]
                }],
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            };
            this.bigLineChart.chartData = chartData;
            this.bigLineChart.activeIndex = index;
        },
        onSort() {
            console.log(arguments)
        },
    },
    mounted() {
        this.initBigChart(0);
    },
};
</script>

<style>
.el-table .cell {
    padding-left: 0px;
    padding-right: 0px;
}
</style>
