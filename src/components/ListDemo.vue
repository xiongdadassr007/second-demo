<template>
    <div class="list-container">
        <div class="list-container-select">
            <input type="checkbox" :checked="listStatus" :id="listId" @click="changeSelect" />
            <label :for="listId">
                <img :src="listImg" alt="" height="100px" />
            </label>
        </div>
        <div class="list-container-describe">
            <span>{{listTitle}}</span>
            <div style="display: flex; align-items: center; justify-content: space-around">
                <span style="margin-right: 20px">单价: ￥{{listPrice}}</span>
                <slot name="countSlot"> 计数器 </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ListDemo",
    props: {
        // 接收图片资源链接
        listImg: {
            type: String,
            default: ''
        },
        // 接收商品标题
        listTitle: {
            type: String,
            default: ''
        },
        // 接收商品价格
        listPrice: {
            type: Number,
            default: 0
        },
        // 接收商品状态
        listStatus: {
            type: Boolean,
            require: true
        },
        // 接收商品id
        listId: {
            type: Number,
            require: true
        }
    },
    data() {
        return {
            
        };
    },
    methods: {
        // 改变并传递选项的状态
        changeSelect(e) {
            let obj = {
                // 注意可能是字符串，需要转成数字
                id: +e.target.id,
                status: e.target.checked
            }
            // console.log(obj);
            this.$emit('chageSelectStatus', obj)
        }
    }
};
</script>

<style lang="less" scoped>
.list-container {
    height: 20%;
    display: flex;
    border-bottom: 1px solid #2333;
    align-items: center;
    .list-container-select {
        // 偏移会造成超出内容区域
        // transform: translate(20%);
        display: flex;
        align-items: center;
        margin-right: 3%;
    }
    .list-container-describe {
        padding-right: 5%;
        height: 100%;
        // transform: translate(35%);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
}
</style>