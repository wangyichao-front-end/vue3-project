<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:10px;margin-left: 20px;">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../assets/imgs/user.png" alt="">
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="role">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2022-10-2</span></p>
                    <p>地点：<span>南京</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px;height: 450px;" shadow="hover">

                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="产品名" />
                    <el-table-column prop="todayBuy" label="今日销量" />
                    <el-table-column prop="monthBuy" label="月销量" />
                    <el-table-column prop="totalBuy" label="总销量" />

                </el-table>
            </el-card>
        </el-col>
        <el-col :span="15" style="margin-top:10px;">
            <div class="num">
                <el-card :body-style="{ display: 'flex' }" v-for="item in countData" :key="item.name">
                    <component class="icons" :is="item.icon" :style="{ background: item.color }"></component>
                    <div class="details">
                        <p class="nums">¥{{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>


            </div>
            <el-card :body-style="{ height: '280px' }">
                <div ref='echart' style="height:280px"></div>
            </el-card>
            <div class="graph">
                <el-card style="height:260px">
                    <div ref="userechart" style="height:240px"></div>
                </el-card>
                <el-card style="height:260px" >
                    <div ref="videochart" style="height:240px"></div>
                </el-card>

            </div>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.home {
    //此处解决home页面有上下 左右 滚动条 
    width: 100%;
    height: 100%;
    overflow: hidden;
    
    .user {
        display: flex;
        align-items: center;

        img {
            width: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }

    .login-info {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-size: 14px;
        color: #999;

        span {
            margin-left: 5px;
            color: #666;
        }
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;

            >.el-card__body {
                display: flex;
            }

            .icons {
                width: 40px;
                height: 40px;
                font-size: 30px;
                text-align: center;
                line-height: 80px;
                color: #fff;
                padding: 19px;
            }

            .details {
                margin-left: 15px;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .nums {
                    font-size: 30px;
                    margin-bottom: 10px;
                }

                .txt {
                    font-size: 14px;
                    text-align: center;
                    color: #999
                }
            }
        }
    }
}
</style>

<script>
import * as  echarts from 'echarts'
import { onMounted, ref, getCurrentInstance, reactive } from 'vue';
// import axios from 'axios'
export default {
    setup() {
        const { proxy } = getCurrentInstance()  //用来获取当前组建的实例（this）
        let tableData = ref([]);
        let countData = ref([]);
        //echarts表格渲染
        let xOptions = reactive({
            legend: {
                // 图例文字颜色
                textStyle: {
                    color: "#333",
                },
            },
            grid: {
                left: "20%",
            },
            // 提示框
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category", // 类目轴
                data: [],
                axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                },
                axisLabel: {
                    interval: 0,
                    color: "#333",
                },
            },
            yAxis: [
                {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                    },
                },
            ],
            color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
            series: [],
        })
        let pieOptions = reactive({
            tooltip: {
                trigger: "item",
            },
            color: [
                "#0f78f4",
                "#dd536b",
                "#9462e5",
                "#a6a6a6",
                "#e1bb22",
                "#39c362",
                "#3ed1cf",
            ],
            series: [],
        })
        //折线数据
        let orderData = reactive({
            xData: [],
            series: [],
        })
        //柱状数据
        let userData = reactive({
            xData: [],
            series: [],
        })
        //饼图数据
        let videoData = reactive({
            series: []
        })


        const getTableList = async () => {
            // await axios.get('/home/getTableData').then((res)=>{
            //     tableData.value = res.data.data.tableData;
            //     console.log(tableData.value);
            // }).catch(e => {console.log(e);})
            let res = await proxy.$api.getTableData();
            tableData.value = res.tableData;
        }
        const getCountData = async () => {
            let res = await proxy.$api.getCountData();
            countData.value = res.countData;
        }

        const getChartData = async () => {
            let result = await proxy.$api.getChartData();
            let res = result.orderData;
            let userRes = result.userData;
            let videoRes = result.videoData;
            orderData.xData = res.date;
            const keyArray = Object.keys(res.data[0]);
            const series = [];
            keyArray.forEach((key) => {
                series.push({
                    name: key,
                    data: res.data.map(item => item[key]),
                    type: 'line'
                })
            });
            orderData.series = series;
            xOptions.xAxis.data = orderData.xData;
            xOptions.series = orderData.series;
            let hEcharts = echarts.init(proxy.$refs.echart);
            //进行渲染
            hEcharts.setOption(xOptions)


            //柱状图
            console.log(userRes);

            userData.xData = userRes.map((item)=>{
              return  item['date']
            })
            userData.series = [
                {
                    name:'新增用户',
                    data:userRes.map(item => item.new),
                    type:'bar'
                },
                {
                    name:'活跃 用户',
                    data:userRes.map(item => item.active),
                    type:'bar'
                }
            ]
            xOptions.xAxis.data = userData.xData;
            xOptions.series = userData.series;
            let uEcharts = echarts.init(proxy.$refs['userechart']);
            uEcharts.setOption(xOptions)

            //饼状图
            videoData.series= [
                {
                    data:videoRes,
                    type:"pie"
                }
            ];
            pieOptions.series = videoData.series;
            let vEcharts = echarts.init(proxy.$refs['videochart']);
            vEcharts.setOption(pieOptions)

        }
        onMounted(() => {
            getTableList();
            getCountData();
            getChartData();
        });



        return {
            tableData, countData
        }
    }
}
</script>