import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/*Storage API를 사용한 데이터 처리를 별도로 빼낸 것
  --> JSON형태로 데이터가 저장된다.*/
var STORAGE_KEY = 'todo-vuekr-demo'
var todoStorage = {
    fetch: function() {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function(todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/*
new Vue({
    el: '#app',
    template: '</App>',
    components: { App },
    render: h => h(App)
})*/

var todo = new Vue({
    el: '#todo',
    data: {
        todos: [],
        options: [{
            value: -1,
            label: '전체'
        }, {
            value: 0,
            label: '작업 중'
        }, {
            value: 1,
            label: '완료'
        }],
        current: -1,
    },
    computed: {
        labels() {
            return this.options.reduce(function(a, b) {
                return Object.assign(a, {
                    [b.value]: b.label
                })
            }, {})
        },
        computedTodos: function() {
            return this.todos.filter(function(el) {
                return this.current < 0 ? true : this.current === el.state
            }, this)
        },
    },
    watch: {
        //옵션을 사용하는 경우, 객체 형식을 지정합니다.
        todos: {
            //매개 변수로는 속성의 변경 후 값이 들어옵니다. 
            handler: function(todos) {
                todoStorage.save(todos)
            },
            //deep 옵션으로 내부의 데이터까지 감시
            deep: true
        }
    },
    created() {
        //인스턴스 생성 때 자동으로 fetch() 기능 실행
        //fetch메소드 정의는 methods 내부에 하는 것이 아님
        this.todos = todoStorage.fetch()
    },
    methods: {
        //todo 추가 처리
        doAdd: function(event, value) {
            // ref로 이름이 붙어있는 요소를 참조한다.
            var comment = this.$refs.comment
                //입력이 없다면 아무것도 하지 않음 return
            if (!comment.value.length) {
                return
            }
            //{ 새로운 ID, 내용, 작업 상태 }
            //형태의 객체를 todo 리스트에 추가
            //작업상태 'state'는 디폴트로 '작업중 = 0'으로 생성
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            comment.value = ''
        },
        //상태 변경 처리
        doChangeState: function(item) {
            item.state = item.state ? 0 : 1
        },

        //제거처리
        doRemove: function(item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    }
})