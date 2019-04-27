<template>
    <div>
        {{$store.state.count}}
        <button @click="add(100)">add</button>
    </div>
    </template>
<script>
    import {mapState,mapMutations,mapGetters} from 'vuex';
    export default {
        data:function(){
            return {

            }
        },
        methods:{
            fn(num){
                this.$store.commit("add",num);
            }
        }

    }
</script>