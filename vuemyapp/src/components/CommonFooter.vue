<template>
    <div>
        <ul class="footer-title" :style="{background: selectMenu.bg}">
            <li v-for="(item,index) in menu" :key="index" @click="$emit('change',index)">
                <router-link :to="item.path">{{item.name}}</router-link>
            </li>
        </ul>
    </div>    
</template>

<script>
export default {
    props: ["menu","selectMenu"]
}
</script>

<style>
    .footer-title{
        display: flex;
        justify-content: space-around;
        font-size: 20px;
        height: 1rem;
        line-height: 1rem;
        background: #f00;
        position: fixed;
        bottom: 0px;
        width: 100%;
    }
    .footer-title a{
        color: #000;
    }
    .footer-title a:focus{
        outline: none;
    }
    .footer-title a.router-link-active{
        color: #fff;
    }
</style>
