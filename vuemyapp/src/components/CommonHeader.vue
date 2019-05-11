<template>
    <div class="header">
        <div :style="{background: selectMenu.bg}">
            <span>首页</span>
            <span class="class-name">{{selectMenu.name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["selectMenu"]
};
</script>

<style scoped>
    .header{
        font-size: 20px;
        height: 1rem;
        line-height: 1rem;
        background: #ff0000;
        position: fixed;
        width: 100%;
        overflow: hidden;
    }
    .class-name{
        position: absolute;
        left: 50%;
        transform: translatex(-50%);
    }

</style>
