<template>
    <div class="Tags">
        <el-tag v-for="(item, index) in tags" :key="item.label" :closable="item.label !== '首页'"  @close="handleClose(item, index)"
            :disable-transitions="false" :effect="$route.name == item.name ? 'dark' : 'plain'" @click="changeMenu(item)">
            {{ item.label }}
        </el-tag>
    </div>
</template>   
<script>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {
        const router = useRouter()
        const store = useStore();
        const route = useRoute()
        let tags = store.state.tabList;
        const changeMenu = function (item) {
            router.push({ path: item.path });
        }
        const handleClose = function (item, index) {
            let len = tags.length;

            store.commit('closeTab', item);


            if (item.name !== route.name) {
                return
            } else {
                if (index === len - 1) {
                    router.push({
                        name: tags[index - 1].name
                    })
                }else {
                    router.push({
                        name :tags[index].name
                    })
                }
            }
 

        }
        
        return {
            tags, changeMenu, handleClose
        }
    }
}
</script>

<style lang="less" scoped>
.Tags {
    padding: 10px;
    width: 100%;

    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>