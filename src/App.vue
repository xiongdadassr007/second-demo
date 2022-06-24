<template>
    <div id="app">
        <el-container>
            <el-header>购物车案例</el-header>
            <el-main>
                <ListDemo
                    v-for="item in requestData"
                    :key="item.id"
                    :list-img="item.goods_img"
                    :list-title="item.goods_name"
                    :list-price="item.goods_price"
                    :list-status="item.goods_state"
                    :list-id="item.id"
                    @chageSelectStatus="chageSelectStatus"
                >
                    <template #countSlot>
                        <Count
                            :count-num="item.goods_count"
                            :count-id="item.id"
                            @countChange="countChange"
                        ></Count>
                    </template>
                </ListDemo>
            </el-main>
            <el-footer>
                <BottomSettle
                    :isAllSelect="isAllSelect"
                    @chageAllOption="chageAllOption"
                    :totalPrice="totalPrice"
                    :totalCount="totalCount"
                ></BottomSettle>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
// 引入公共样式
import "@/assets/less/global.less";
// 引入单菜单组件
import ListDemo from "@/components/ListDemo.vue";
// 引入底部结算栏
import BottomSettle from "@/components/BottomSettle.vue";
// 引入计数器
import Count from "@/components/Count.vue";

export default {
    name: "App",
    components: {
        ListDemo,
        BottomSettle,
        Count,
    },
    data() {
        return {
            requestData: [],
        };
    },
    methods: {
        // 获取商品数据
        async requireData() {
            let { data: res } = await this.$http.get(
                "https://www.escook.cn/api/cart"
            );
            this.requestData = res.list;
            console.log(res);
            console.log(this.requestData);
        },
        // 接收商品选项的改变并处理
        chageSelectStatus(value) {
            // 每次只处理一个可以用some方法 防止多次重复遍历造成浪费
            this.requestData.some((item) => {
                if (item.id === value.id) {
                    item.goods_state = value.status;
                }
            });
        },
        // 接收全选的反馈并处理
        chageAllOption(value) {
            this.requestData.forEach((item) => (item.goods_state = value));
        },
        // 接收并处理计数反馈
        countChange(value) {
            this.requestData.some((item) => {
                if (item.id === value.id) {
                    item.goods_count = value.num;
                }
            });
        },
    },
    computed: {
        // 计算判断商品是否全选
        isAllSelect() {
            return this.requestData.every((item) => item.goods_state === true);
        },
        // 计算商品的总价
        totalPrice() {
            return this.requestData
                .filter((item) => item.goods_state === true)
                .reduce(
                    (prev, item) =>
                        (prev += item.goods_count * item.goods_price),
                    0
                );
        },
        // 计算商品总数
        totalCount() {
            return this.requestData
                .filter((item) => item.goods_state === true)
                .reduce((prev, item) => (prev += item.goods_count), 0);
        },
    },
    created() {
        this.requireData();
    },
};
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
}

.el-header {
    background-color: rgb(0, 125, 203);
    font-weight: 900;
    line-height: 60px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    padding: 0;
}

.el-container {
    margin-bottom: 40px;
    height: 100%;
}
</style>
