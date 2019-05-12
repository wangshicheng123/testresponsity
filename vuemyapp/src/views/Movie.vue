<template>
    <div>
        <div class="loading" v-if="isShow">
            <img src="@/assets/imgs/loading.gif" alt="">
        </div>
        <ul class="movie-list">
            <li class="movie-item" v-for="(item,index) in movieList" :key="index" >
                <div class="movie-img">
                    <img :src="item.medium" alt="">
                </div>
                <div class="movie-content">
                    <h4 class="movie-title">{{item.title}}</h4>
                    <div class="movie-author">
                        <span v-for="(cast,index) in item.casts" :key="index">{{cast.name}}/</span>
                    </div>
                    <div class="movie-view-count">12345653 观看</div>
                    <div class="movie-time">年份： 2019</div>
                    <div class="movie-class">动作/科幻/奇幻/</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from "axios"
export default {
    data(){
        return {
            movieList: [],
            isShow: true, // 该变量用于记录loading图片是显示还是隐藏
            isRequest: true //该变量用于记录所有数据的长度是否等于已经请求的数据的长度，若等于则不进行继续请求
        }
    },

    created(){
        this.getMovieData();  // 首次请求数据

        window.onscroll=()=>{
            let scrollTop=document.documentElement.scrollTop; // 当前滚动的高度
            let scrollHeight=document.documentElement.scrollHeight; // 当前滚动区域的高度
            let height=document.documentElement.clientHeight; // 当前可视区域的高度

            if(scrollTop + height==scrollHeight && this.isRequest){
                this.getMovieData();
            }
        }
    },
    methods:{
        getMovieData(){
            this.isShow=true;
            // 请求的起始位置即为数据的当前长度
            axios.get('https://bird.ioliu.cn/v1?url=https://api.douban.com/v2/movie/in_theaters?city=哈尔滨&start='+this.movieList.length+'&count=10').then((res)=>{
            this.movieList=[...this.movieList,...res.data.subjects];
            this.isShow=false; // 隐藏loading图标
            if(this.movieList.length==res.data.total){
                this.isRequest=false; // 不再进行请求数据
            }
        });
        }
    }

}
</script>

<style scoped>
.movie-list{
    margin: 0.1rem 0.1rem 0rem 0.1rem;
}

.movie-item{
    display: flex;
    border-bottom: 1px solid #666;
    margin-top: 0.1rem;
}
.movie-item .movie-img img{
    width: 2.2rem;
    height: 3rem;
    margin-right: 0.2rem;
}
.movie-item .movie-content{
    flex: 1;
}
.loading{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>
