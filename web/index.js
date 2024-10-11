const App = Vue.createApp({
    data() {
        return {
            showed: false,
            title: 'Example',
            showNumberOfTask: false,
            maximumTask : 0,
            currentTaskAmount : 0,
            dynamicBar: false,
            
            taskList: [
                { index: 1, icon: 'fa-solid fa-car', text: 'This is an example task', completed: false, currentStage: 0 ,totalStage: 2},
                { index: 1, text: 'This is an example task', completed: false},
            ]
        }
    },
    computed: {
        barWidth() {
            const width = (this.currentTaskAmount / this.maximumTask) * 100;
            return Math.max(5, Math.min(width, 95));
        
        }
    },
    methods: {
        formatStage(item) {
            return item.totalStage != null && item.totalStage != 0 ? `${item.currentStage || 0}/${item.totalStage}` : '';
        },
        toggleTaskCompletion(index) {
            const task = this.taskList.find(task => task.index === index);
            
            if (task) {
                task.completed = task.completed ? !task.completed : true;
            }
        },
        onMessage(event) {
            if (event.data.type == "toggleUi") {
                this.showed = event.data.table.state

                if (!event.data.table.state) {
                    this.showNumberOfTask = false
                    this.maximumTask = 0
                    this.currentTaskAmount = 0
                    this.taskList = []
                }
            }
            else if (event.data.type == "toggleNumberOfTask") {
                if (!this.maximumTask) return
                this.showNumberOfTask = event.data.table.state
            }
            else if (event.data.type == 'updateTaskAmount') {
                if (event.data.table.taskAmount > this.maximumTask || !this.maximumTask) return

                this.currentTaskAmount = event.data.table.taskAmount
            }
            else if (event.data.type == 'updateStageAmount') {
                const task = this.taskList.find(task => task.index === event.data.table.index);

                if (task) {
                    if (task.totalStage == 0) return
                    if (event.data.table.currentStage > task.totalStage) return
                    
                    task.currentStage = event.data.table.currentStage
                }
            }
            else if (event.data.type == 'toggleCompleteByIndex') {
                this.toggleTaskCompletion(event.data.table.index)
            }
            else if (event.data.type == 'setTaskData') {
                if (event.data.table.currentTaskAmount > event.data.table.maximumTask) return

                this.title = event.data.table.title || 'No title setted'
                this.maximumTask = event.data.table.maximumTask || false
                this.currentTaskAmount = this.maximumTask ? event.data.table.currentTaskAmount || 0 : false
                this.showNumberOfTask = this.maximumTask ? event.data.table.showNumberOfTask || false : false
                this.dynamicBar = this.maximumTask ? event.data.table.dynamicBar || false : false
                this.taskList = event.data.table.tasks || []
            }
            else if (event.data.type == 'resetCompletes') {
                this.taskList.forEach(task => {
                    task.completed = false;
                });
            }
        }
    },
    async mounted() {
        window.addEventListener('message', this.onMessage);
    }
}).mount('#app');