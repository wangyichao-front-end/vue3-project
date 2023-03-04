<template>
    <div class="user-header">
        <el-button type="primary" @click="dialogVisible = true, action = 'addr'">+ 新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="请输入">
                <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索🔍</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="List" style="width: 100%" height="700">
            <el-table-column v-for="item in tableLabel" :prop="item.prop" :label="item.label" :width="item.width || 200"
                :key="item.label" />
            <el-table-column fixed="right" label="操作" min-width="180">
                <template #default="scope">
                    <el-button size="small" @click="handleClick(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination background layout="prev, pager, next" :total="config.total" @current-change="changePage" />
    </div>


    <el-dialog v-model="dialogVisible" :title="action == 'add' ? 新增用户 : 编辑用户" width="35%" :before-close="handleClose"
        :size='large'>
        <el-form :model="formUser" label-width="120px" ref="userForm">
            <el-row>
                <el-col :span='12'>
                    <el-form-item prop="name" label="姓名"
                        :rules="[{ required: true, message: '请输入姓名', trigger: 'blur', }]">
                        <el-input v-model="formUser.name" placeholder="请输入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="age" label="年龄" :rules="[{ required: true, message: '请输入年龄', trigger: 'blur' }, {
                        type: Number,
                        message: '年龄必须是数字', trigger: 'blur'
                    }]">
                        <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item prop="sex" label="性别"
                        :rules="[{ required: true, message: '请选择性别', trigger: 'blur', }]">
                        <el-select v-model="formUser.sex" placeholder="请选择">
                            <el-option label="男" value="0" />
                            <el-option label="女" value="1" />
                        </el-select>
                    </el-form-item></el-col>
                <el-col :span="12">
                    <el-form-item prop="birth" label="出生日期"
                        :rules="[{ required: true, message: '请选择出生日期', trigger: 'blur', }]">
                        <el-date-picker v-model="formUser.birth" type="date" placeholder="选择日期"
                            value-format="YYYY-MM-DD" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item prop="addr" label="地址" style="width: 70%">
                <el-input v-model="formUser.addr" placeholder="请输入地址" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancel">
                    {{ action== 'addr' ? '删除' : '取消'}}
                </el-button>
                <el-button type="primary" @click="onSubmit">
                    {{ action== 'addr' ? '添加' : '编辑'}}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script>
import { ElMessageBox, ElMessage } from 'element-plus';
import { getCurrentInstance, onMounted, ref, reactive } from 'vue';


export default {
    setup() {
        const { proxy } = getCurrentInstance();
        let List = ref([]);
        let config = reactive({
            total: 0,
            page: 1,
            name: ''
        })
        let tableLabel = reactive([
            {
                prop: "name",
                label: '姓名',
            },
            {
                prop: "age",
                label: '年龄',
            },
            {
                prop: "sex",
                label: '性别',
            },
            {
                prop: "birth",
                label: '生日',
                width: 200
            },
            {
                prop: "addr",
                label: '地址',
                width: 300
            }
        ])
        let formInline = reactive({
            keyword: '',
        })
        let formUser = reactive({
            name: '',
            age: '',
            sex: '',
            birth: '',
            addr: '',
        })
        let dialogVisible = ref(false) //控制模态框的显示与隐藏

        let action = ref('add');
        const getUserData = async (config) => {
            let res = await proxy.$api.getUserData(config);
            config.total = res.count;
            List.value = res.list
            List.value = List.value.map(item => {
                let Sex = item.sex;
                item.sex = Sex == 0 ? '男' : '女';
                return item
            })
        }
        const handleSearch = () => {
            config.name = formInline.keyword;
            getUserData(config)
        }


        const changePage = (page) => {
            //参数page 是点击的页码
            config.page = page;
            getUserData(config);
        }
        const handleClose = () => {
            ElMessageBox.confirm('确认关闭吗？',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                dialogVisible.value = false;
                proxy.$refs.userForm.resetFields();
            })
        }
        const onSubmit = async () => {
            for (let i in formUser) {
                if (!formUser[i]) return
            }
            await proxy.$api.addUser(formUser);
            getUserData(config);
            proxy.$refs.userForm.resetFields();
            dialogVisible.value = false;
        }

        const handleCancel = () => {
            proxy.$refs.userForm.resetFields();
            dialogVisible.value = false;
        }
        const handleClick = (row) => {
            action.value = 'edit'
            console.log('当前行数据--', row);

            proxy.$nextTick(() => {
                for (let i in row) {
                    formUser[i] = row[i]
                }
            })
            dialogVisible.value = true;

        }

        const handleDelete = (row) => {
            ElMessageBox.alert('确定删除该条信息？', '提示', {
                // if you want to disable its autofocus
                // autofocus: false,
                confirmButtonText: '确定',
                callback: async () => {
                    await proxy.$api.deleteUser(row);
                    // proxy.$nextTick(() => {
                        getUserData(config);
                    // }) 
                    ElMessage({
                        message: '删除成功！',
                        grouping: true,
                        type: 'success',
                    })
                },
            })


        }
        onMounted(() => {
            getUserData(config);
        })
        return {
            List,
            tableLabel,
            config,
            formInline,
            dialogVisible,
            formUser,
            action,
            changePage,
            handleSearch,
            handleClose,
            onSubmit,
            handleCancel,
            handleClick,
            handleDelete
        }

    }
}
</script>


<style scoped lang="less">
.user-header {
    display: flex;
    justify-content: space-between;
}

.table {

    .el-pagination {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 40px;
    }

    :deep(th) {
        text-align: center;
    }

    :deep(.cell) {
        text-align: center;
        height: 40px;
        line-height: 40px;
    }


}
</style>