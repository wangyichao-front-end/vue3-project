<template>
    <div class="common-layout">
        <el-container class="lay-container">
            <CommonAside></CommonAside>
            <el-container>
                <common-header></common-header>
                <CommonTag/>
                <el-main style="margin-top:10px;margin-left:20px">
                    <router-view ></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
}

.el-container {
    flex-wrap: wrap;
    height: 50px;
}

.common-layout {
    height: 100%;

    &>.el-container {
        height: 100%;

    }

    .lay-container {
        flex-wrap: nowrap;
    }
}

.el-main {
    padding-top: 0;
}
</style>
<script>
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import CommonTag from '../components/CommonTag.vue';

export default {
    setup() {

    },
    components: {
        CommonHeader,
        CommonAside,
        CommonTag
    }
}
</script>