<template>
    <div id="tes">
        <h1>这是一个页面的标题: {{$route.params.id}}</h1>
        <router-link to="/alias">test2子标题</router-link>
        <router-link to="/test/test3">test3子标题</router-link>
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .fade-enter{
        opacity: 0;
    }
    .fade-enter-active{
        transition: opacity 2s ease 1s ;
    }
    .fade-enter-to{
        opacity: 1;
    }


    .fade-leave{
        opacity: 1;
    }
    .fade-leave-active{
        transition: opacity 2s ease 1s;
    }
    .fade-leave-to{
        opacity: 0;
    }
</style>



