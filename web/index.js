const App = Vue.createApp({
    data() {
        return {
            showed: false,
            title: 'Example',
            showNumberOfTask: false,
            maximumTask : 0,
            currentAmountTask : 0,
            taskList: [
                { index: 1, text: 'This is an example task', completed: false, currentStage: 0 ,totalStage: 2},
                { index: 1, text: 'This is an example task', completed: false},
            ]
        }
    },
    methods: {
        formatStage(item) {
            return item.totalStage != null && item.totalStage != 0 ? `${item.currentStage}/${item.totalStage}` : '';
        },
        toggleTaskCompletion(index) {
            const task = this.taskList.find(task => task.index === index);
            
            if (task) {
                task.completed = !task.completed;
            }
        },
        onMessage(event) {
            if (event.data.type == "toggleUi") {
                this.showed = event.data.table.state

                if (!event.data.table.state) {
                    this.showNumberOfTask = false
                    this.maximumTask = 0
                    this.currentAmountTask = 0
                    this.taskList = []
                }
            }
            else if (event.data.type == "toggleNumberOfTask") {
                if (this.maximumTask == 0) return

                this.showNumberOfTask = event.data.table.state
            }
            else if (event.data.type == 'updateTaskAmount') {
                if (event.data.table.taskAmount > this.maximumTask) return

                this.currentAmountTask = event.data.table.taskAmount
            }
            else if (event.data.type == 'updateStageAmount') {
                const task = this.taskList.find(task => task.index === event.data.table.index);

                if (task) {
                    if (task.totalStage == 0) return
                    if (event.data.table.currentStage > task.totalStage) return
                    
                    task.currentStage = event.data.table.currentStage
                }
            }
            else if (event.data.type == 'setCompleteByIndex') {
                this.toggleTaskCompletion(event.data.table.index)
            }
            else if (event.data.type == 'setTaskData') {
                if (event.data.table.title == null || event.data.table.maximumTask == null || event.data.table.currentAmountTask == null || event.data.table.showNumberOfTask == null || event.data.table.taskList == null) return
                if (event.data.table.currentAmountTask > event.data.table.maximumTask) return

                this.title = event.data.table.title
                this.maximumTask = event.data.table.maximumTask
                this.currentAmountTask = event.data.table.currentAmountTask
                this.showNumberOfTask = event.data.table.showNumberOfTask
                this.taskList = event.data.table.taskList
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